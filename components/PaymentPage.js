"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";

import { useParams, useRouter } from "next/navigation";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";

const PaymentPage = ({ params }) => {
  const { data: session } = useSession();

  const [customAmount, setCustomAmount] = useState("");
  params = React.use(params);
  const router = useRouter();
  const [currentUser, setcurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || {};
  });

  const [payments, setpayments] = useState(() => {
    return JSON.parse(localStorage.getItem("payments")) || [];
  });

  const [paymentform, setpaymentform] = useState({
    name: "",
    amount: "",
    message: "",
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("🦄 Payment has been made", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      const newUrl = `/user/${params.username}`; // Get the dynamic route from params
      router.replace(newUrl);
    }
  }, []);

  useEffect(() => {
    if (session === undefined) return;
    const getData = async () => {
      let u = await fetchuser(session.user.email);
      setcurrentUser(u);
      let dbpayments = await fetchpayments(params.username);
      setpayments(dbpayments);

      localStorage.setItem("currentUser", JSON.stringify(u));
      localStorage.setItem("payments", JSON.stringify(dbpayments));
    };
    getData();
  }, [session]);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  // Function to handle predefined amount selection
  // const handleAmountClick = (amount) => {
  //   setCustomAmount(amount);
  // };

  const pay = async (amount) => {
    // get the order id

    let a = await initiate(
      amount,
      params.username,
      paymentform,
      session.user.email
    );
    let orderId = a.id;
    var options = {
      key: `${currentUser.razorpayid}`, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Buy me a Kofee", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="relative h-[55vh]">
        {/* Cover Image */}
        {currentUser.coverpic ? (
          <Image
            src={currentUser.coverpic}
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            placeholder="empty"
            unoptimized={false} // Optimize image loading as needed
          />
        ) : (
          // Fallback content for cover image
          <div className="h-full w-full bg-gray-800 flex items-center justify-center">
            <p className="text-slate-400">Loading cover image...</p>
          </div>
        )}

        {/* Profile Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-white border-4 rounded-full overflow-hidden w-[160px] h-[160px]">
          {currentUser.profilepic ? (
            <Image
              src={currentUser.profilepic}
              alt="User Profile"
              layout="fill"
              objectFit="cover"
              placeholder="empty"
              unoptimized={false} // Optimize image loading as needed
            />
          ) : (
            // Fallback content for profile image
            <div className="w-full h-full bg-gray-500 flex items-center justify-center">
              <p className="text-slate-100">Loading profile image...</p>
            </div>
          )}
        </div>
      </div>

      <div className="info flex justify-center items-center my-20 flex-col gap-3">
        <div className="text-4xl font-bold">{params.username}</div>
        <div className="text-slate-100 text-md">
          Let's support {currentUser.username}.
        </div>
        <div className="text-md text-slate-400">
          {payments.length} people supported this page. {currentUser.username}{" "}
          has raised ₹{payments.reduce((a, b) => a + b.amount, 0)}
        </div>
      </div>
      <div className="payment flex gap-6 w-[80%] lg:flex-row flex-col mx-auto mb-8">
        <div className="supporters p-6 w-full lg:w-1/2 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg border border-slate-700 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-slate-100 mb-6 border-b border-slate-700 pb-4 text-center tracking-wide">
            🌟 Top Supporters
          </h2>

          {payments.length > 0 ? (
            <div className="max-h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-gray-800 hover:scrollbar-thumb-slate-600">
              <ul className="space-y-4">
                {payments.map((payment) => (
                  <li
                    key={payment.oid}
                    className="p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200 shadow-md flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      {/* Profile Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-600">
                        <img
                          src={`https://i.pravatar.cc/100?u=${payment.name}`}
                          alt={payment.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        {/* Supporter Name */}
                        <span className="font-semibold text-slate-100 block">
                          {payment.name}
                        </span>
                        {/* Donation Amount */}
                        <span className="text-slate-400 text-sm">
                          Donated
                        </span>{" "}
                        <span className="text-sky-400 font-bold text-sm">
                          ₹{payment.amount}
                        </span>
                      </div>
                    </div>
                    {/* Message */}
                    <div className="italic text-sm text-slate-400">
                      "{payment.message}"
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-slate-400 italic mt-6">
              <p className="text-lg">No supporters yet...</p>
              <p className="text-sm text-slate-500 mt-1">
                Be the first to support and make a difference! 🌟
              </p>
            </div>
          )}
        </div>

        <div className="makepayment p-5  lg:w-1/2 bg-slate-900 rounded-lg shadow-lg border border-slate-700 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">
            Make a Payment
          </h2>
          <div className="payment-container p-6 bg-gradient-to-b from-[#1a1a1a] via-[#00091d] to-transparent rounded-2xl shadow-lg border border-slate-700">
            <form className="space-y-6">
             

              {/* Custom Amount Input */}
              <div className="input-group">
                <label
                  className="block text-slate-400 text-sm mb-1"
                  htmlFor="custom-amount"
                >
                  Custom Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  id="custom-amount"
                  onChange={handleChange}
                  value={paymentform.amount}
                  placeholder="Enter custom amount"
                  className="w-full p-3 rounded-md bg-transparent border border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Name Input */}
              <div className="input-group">
                <label
                  className="block text-slate-400 text-sm mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  id="name"
                  value={paymentform.name}
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-md bg-transparent border border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Message Input */}
              <div className="input-group">
                <label
                  className="block text-slate-400 text-sm mb-1"
                  htmlFor="message"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  rows="3"
                  value={paymentform.message}
                  placeholder="Add a message"
                  className="w-full p-3 rounded-md bg-transparent border border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                ></textarea>
              </div>

              {/* Payment Button */}
              <button
                type="button"
                onClick={() => {
                  pay(paymentform.amount * 100);
                }}
                disabled={
                  paymentform.name.length < 3 ||
                  paymentform.amount < 10 ||
                  paymentform.message.length < 4
                }
                className={`w-full p-3 text-white rounded-md font-medium transition 
    ${
      paymentform.name.length < 3 || paymentform.amount < 10
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-sky-600 hover:bg-sky-700"
    }`}
              >
                Proceed to Pay {paymentform.amount}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
