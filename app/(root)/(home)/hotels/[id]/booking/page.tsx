"use client";

import { useEffect, useState } from "react";
import BookingDetailsSummary from "@/components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";

import { useSearchContext } from "@/contexts/searchContext";
import { useParams } from "next/navigation";
import { getHotelById } from "@/actions/hotels";
import { HotelFormType } from "@/types";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "@/actions/bookings";
import StripeForm from "@/components/StripeForm";
import { getUserById } from "@/actions/auth";
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const Booking = () => {
  const [hotel, setHotel] = useState<HotelFormType>();
  const [currentUser, setCurrentUser] = useState();
  const [paymentIntent, setPaymentIntent] = useState<any>();
  const search = useSearchContext();
  const session = useSession();

  const { id: hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(1);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const totalNights = Math.ceil(
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
          (1000 * 60 * 60 * 24) +
          1
      );
      setNumberOfNights(totalNights)

      const getPaymentIntent = async () => {
        const res = await createPaymentIntent(
          hotelId as string,
          totalNights,
          session.data?.user?.id as string
        );

        setPaymentIntent(res);
      };
      getPaymentIntent();
    }
  }, [search.checkIn, search.checkOut]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUserById(session.data?.user?.id as string);
        setCurrentUser(currentUser);
      } catch (error) {}
    };
    fetchUser();
  }, [setCurrentUser]);

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
    <div className='grid md:grid-cols-[1fr_2fr]'>
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {session.data?.user?.id && paymentIntent && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntent.clientSecret,
          }}
        >
          <StripeForm
            currentUser={currentUser}
            userId={session.data?.user?.id}
            paymentIntent={paymentIntent}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
