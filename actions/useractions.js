"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// Fetch user data by email
export const fetchuser = async (email) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email }).lean(); // `lean` simplifies the document
    if (!user) throw new Error("User not found");

    // Convert `_id` to string
    return {
      ...user,
      _id: user._id.toString(), // Ensure `_id` is a string
    };
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
};


// Update user profile
export const updateProfile = async (data, email) => {
  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error("User not found");

    const updatedData = { ...data };

    // If username is being updated, check for availability
    if (data.username && data.username !== existingUser.username) {
      const usernameExists = await User.findOne({ username: data.username });
      if (usernameExists) {
        return { error: "Username already exists" };
      }
    }

    // Update user profile in the database
    await User.updateOne({ email }, updatedData);

    // If username changed, update Payment records
    if (data.username && data.username !== existingUser.username) {
      await Payment.updateMany({ to_user: existingUser.username }, { to_user: data.username });
    }

    return { message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};

// Fetch payments for a specific user
export const fetchpayments = async (username) => {
  await connectToDatabase();
  // Fetch payments sorted by amount in descending order
  let p = await Payment.find({ to_user: username }).sort({ amount: -1 }).lean();
  console.log(p)
  return p;
};


// Initiate Razorpay order
export const initiate = async (amount, to_username, paymentform) => {
  try {
    await connectToDatabase();

    const instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: Number.parseInt(amount),
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    // Create a pending payment in the database
    await Payment.create({
      oid: order.id,
      amount: amount / 100,
      to_user: to_username,
      name: paymentform.name,
      message: paymentform.message,
    });

    return order;
  } catch (error) {
    console.error("Error initiating payment:", error.message);
    throw error;
  }
};
