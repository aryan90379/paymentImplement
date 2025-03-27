"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile,updatePayments } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";


const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session === undefined) return;
    if (!session) {
      router.push("/login");
    } else {
      getUserData();
    }
  }, [session]);

  const getUserData = async () => {
    try {
      const user = await fetchuser(session?.user?.email);
      setForm(user);
      setLoading(false);
      
    } catch (err) {
      setError("Failed to fetch user data.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const response = await updateProfile(form, session?.user?.email);
      await updatePayments(form.username)

      if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);

      if(!saving && !error){
         toast("Profile updates succefully 🎉", {
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
      }
    }
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-4 py-12">
        <div className="p-8 w-full max-w-2xl md:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center tracking-wide">
            Update Profile
          </h1>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow-md rounded-2xl dark:bg-gray-800"
          >
            {[
              "name",
              "username",
              "email",
              "profilepic",
              "coverpic",
              "razorpayid",
              "razorpaysecret",
            ].map((field) => (
              <div key={field} className="mb-6">
                <label
                  htmlFor={field}
                  className="block mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  value={form[field] || ""}
                  onChange={handleChange}
                  type={
                    field === "razorpayid" || field === "razorpaysecret"
                      ? "password"
                      : "text"
                  }
                  name={field}
                  id={field}
                  readOnly={field === "email"} // Make email field read-only
                  className={`block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all
          ${
            field === "email"
              ? "cursor-not-allowed bg-gray-100 dark:bg-gray-800"
              : "hover:shadow-md"
          }`}
                />
              </div>
            ))}

            <div className="mt-8">
              <button
                type="submit"
                disabled={saving}
                className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition-transform transform focus:outline-none focus:ring-4
        ${
          saving
            ? "bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse cursor-wait"
            : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 hover:scale-105"
        }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          {!saving && !error && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All changes saved successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
