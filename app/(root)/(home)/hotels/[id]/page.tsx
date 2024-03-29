"use client";

import { getHotelById } from "@/actions/hotels";
import GuestInfoForm from "@/components/GuestInfoForm";
import { HotelFormType } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

const Detail = () => {
  const [hotel, setHotel] = useState<HotelFormType>();

  const { id: hotelId } = useParams();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotel = await getHotelById(hotelId as string);
        setHotel(hotel);
      } catch (error) {}
    };

    fetchHotel();
  }, [hotelId]);
  if (!hotel) {
    return <></>;
  }

  return (
    <div className='space-y-6'>
      <div>
        <span className='flex'>
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className='fill-yellow-400' />
          ))}
        </span>
        <h1 className='text-3xl font-bold'>{hotel.name}</h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {hotel.imageUrls.map((image) => (
          <div className='h-[300px]'>
            <img
              src={image}
              alt={hotel.name}
              className='rounded-md w-full h-full object-cover object-center'
            />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
        {hotel.facilities.map((facility) => (
          <div className='border border-slate-300 rounded-sm p-3'>
            {facility}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
        <div className='whitespace-pre-line'>{hotel.description}</div>
        <div className='h-fit'>
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotelId as string}
          />
       
        </div>
      </div>
    </div>
  );
};

export default Detail;
