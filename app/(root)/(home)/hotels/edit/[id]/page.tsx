"use client";

import { getHotelById, updateHotel } from "@/actions/hotels";
import ManageHotelForm, {
  HotelFormData,
} from "@/components/ManageHotelForm/ManageHotelForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditHotel = () => {
  const [hotel, setHotel] = useState();

  const { id: hotelId } = useParams();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await getHotelById(hotelId as string);
        setHotel(res);
      } catch (error) {}
    };

    fetchHotel();
  }, [hotelId]);

  const handleSave = async (hotelFormData: HotelFormData) => {
    try {
      await updateHotel(hotelFormData, hotelId as string);

      toast.success("Hotel Saved!");
    } catch (error) {
      toast.error("Error Saving Hotel!");
    }
  };

  return <ManageHotelForm hotel={hotel} onSave={handleSave} />;
};

export default EditHotel;
