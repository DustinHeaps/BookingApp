"use server";

import { connectToDatabase } from "@/lib/mongoose";

import Hotel from "@/models/hotel";
import { BookingType, HotelFormType } from "@/types";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY as string);

type BookingData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: number,
  userId: string
) => {
  connectToDatabase();

  const hotel = await Hotel.findById(hotelId);

  if (!hotel) {
    return { message: "Hotel not found" }; 
  }
  
  const totalCost = hotel.pricePerNight * (numberOfNights);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: "usd",
    metadata: {
      hotelId,
      userId,
    },
  });

  if (!paymentIntent.client_secret) {
    return { message: "Error creating payment intent" };
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret?.toString(),
    totalCost,
  };

  return JSON.parse(JSON.stringify(response));
};

export const createBooking = async (bookingData: any, userId: string) => {
  try {
    connectToDatabase();
    const { paymentIntentId, hotelId } = bookingData;

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );

    if (!paymentIntent) {
      return { message: "payment intent not found" };
    }
    bookingData.userId = userId;
    delete bookingData.paymentIntentId;
    const newBooking: BookingType = bookingData;

    const hotel = await Hotel.findOneAndUpdate(
      { _id: hotelId },
      {
        $push: { bookings: newBooking },
      }
    );

    if (!hotel) {
      return { message: "hotel not found" };
    }

    await hotel.save();
    return { message: "Success" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMyBookings = async (userId: string) => {
  connectToDatabase();
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId } },
    });

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking: BookingType) => booking.userId === userId
      );

      let myBookings: BookingData[] = [];
      userBookings.forEach((booking: BookingType) => {
        const data = {
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          adultCount: booking.adultCount,
          childCount: booking.childCount,
        };
        myBookings.push(data);
      });

      const hotelWithUserBookings: HotelFormType = {
        ...hotel.toObject(),
        bookings: myBookings,
      };
      return hotelWithUserBookings;
    });

    return JSON.parse(JSON.stringify(results));
  } catch (error) {
    console.log(error);
    
  }
};
