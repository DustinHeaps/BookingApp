"use client";

import { useSession } from "next-auth/react";
import { getMyHotels } from "@/actions/hotels";
import Link from "next/link";
import { HotelCard } from "@/components/HotelCard";
import { useEffect, useState } from "react";
import { HotelFormType } from "@/types";

const MyHotels = () => {
  const [hotels, setHotels] = useState<HotelFormType[]>();

  const session = useSession();

  useEffect(() => {
    const fetchHotel = async () => {
      const res = await getMyHotels(session.data?.user?.id as string);
      setHotels(res);
    };

    fetchHotel();
  }, [setHotels]);

  if (!hotels) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className='space-y-5'>
      <span className='flex justify-between'>
        <h1 className='text-3xl font-bold'>My Hotels</h1>
        <Link
          href='/add-hotel'
          className='flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500'
        >
          Add Hotel
        </Link>
      </span>
      <div className='grid grid-cols-1 gap-8'>
        {hotels?.map((hotel) => {
          return <HotelCard key={hotel._id} hotel={hotel} />;
        })}
      </div>
    </div>
  );
};

export default MyHotels;
