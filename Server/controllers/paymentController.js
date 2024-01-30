import express from "express";
import {instance} from "../index.js"
import Razorpay from "razorpay";

export const checkout = async (req, res) => {

    try {
    const options = {
      amount: Number(req.body.newAmount * 100),  // Convert to paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    
    // Log the calculated amount
    console.log("Calculated Amount in Paise:", options.amount);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ success: false, error: 'Error during checkout' });
  }
};


export const paymentverification = async (req, res) => {

    console.log(req.body);
    res.status(200).json({success: true})
};
