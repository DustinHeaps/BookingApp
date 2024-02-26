"use server";

import { HotelFormData } from "@/components/ManageHotelForm/ManageHotelForm";
import { connectToDatabase } from "@/lib/mongoose";
import Hotel from "@/models/hotel";


export const getHotels = async () => {
  try {
    connectToDatabase();

    const res = await Hotel.find().sort("-lastUpdated").limit(5)
     
    const hotels = JSON.parse(JSON.stringify(res))
    return hotels;
  } catch (error) {

    return { message: "Error fetching hotels" };
  }
};
export const addHotel = async (formData: any) => {
  try {
    connectToDatabase();

    const newHotel = await Hotel.create(formData);

    return "success";
  } catch (e) {
    console.log(e);

  }
};

export async function getMyHotels(userId: string) {
  try {
    connectToDatabase();

    const res = await Hotel.find({ userId });
    const hotels = JSON.parse(JSON.stringify(res))

    return hotels;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getHotelById = async (hotelId: string) => {
  try {
    connectToDatabase();

  
    const res = await Hotel.findById(hotelId);

    const hotel = JSON.parse(JSON.stringify(res))

    return hotel;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateHotel = async (formData: HotelFormData, hotelId: string) => {
  try {
    connectToDatabase();

    const hotel = await Hotel.findOneAndUpdate({ _id: hotelId }, formData, {
      new: true,
    });

    return hotel;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function getMyBookings(userId: string) {
  try {
    connectToDatabase();

    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId } },
    });

    const results = hotels.map((hotel) => {
      const userBookings = hotel?.bookings?.filter(
        (booking: any) => booking.userId === userId
      );

      const hotelWithUserBookings = {
        ...hotel.toObject(),
        bookings: userBookings,
      };
      return hotelWithUserBookings;
    });

    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
