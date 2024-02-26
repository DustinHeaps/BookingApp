"use client";

import { addHotel } from "@/actions/hotels";
import ManageHotelForm, {
  HotelFormData,
} from "@/components/ManageHotelForm/ManageHotelForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const AddHotel = () => {
  const session = useSession();
  const router = useRouter();

  const handleSave = async (hotelFormData: HotelFormData) => {
    hotelFormData.userId = session.data?.user?.id as string;

    try {
      await addHotel(hotelFormData);
      toast.success("Hotel Saved!");
      router.push("/my-hotels");
    } catch (error) {
      console.log(error);
      toast.error("Error Saving Hotel");
    }
  };

  return <ManageHotelForm onSave={handleSave} />;
};

export default AddHotel;
