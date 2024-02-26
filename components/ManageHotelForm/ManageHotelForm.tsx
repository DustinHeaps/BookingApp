"use client";

import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";

export type HotelFormData = {
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles?: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?: HotelFormData;
  onSave: (FormData: HotelFormData) => void;
};

const ManageHotelForm = ({ onSave, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>({
    defaultValues: {},
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = async (formDataJson: HotelFormData) => {
    delete formDataJson.imageFiles;
    onSave(formDataJson);
  };
  return (
    <FormProvider {...formMethods}>
      <form className='flex flex-col gap-10' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-3xl font-bold mb-3'>
          {" "}
          {hotel ? "Edit" : "Add"} Hotel
        </h1>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className='flex justify-end'>
          <button
            disabled={isSubmitting}
            type='submit'
            className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500'
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
