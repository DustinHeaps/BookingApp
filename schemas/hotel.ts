import { z } from "zod";

export const HotelSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(1, "Hotel name is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  description: z.string().min(1, "a description is required"),
  type: z.string().min(1, "Hotel type is required"),
  adultCount: z.number().min(1, "Adult Count is required"),
  childCount: z.number().min(1, "Child Count is required"),
  facilities: z.string().array().min(1, "Facilities are required"),
  pricePerNight: z.number().min(1, "First Name is required"),
  starRating: z.number().min(1, "A rating is required").max(5),
  lastUpdated: z.date(),
});
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const HotelFormSchema = z.object({
  userId: z.string().min(1, "UserId is required."),
  name: z.string().min(1, "Name is required."),
  message: z.string().min(1, "Message is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  description: z.string().min(1, "Description is required"),
  type: z.string().min(1, "Hotel type is required"),
  adultCount: z.number().min(1, "Adult Count is required"),
  childCount: z.number().min(1, "Child Count is required"),
  facilities: z.string().array().min(1, "Facilities are required"),
  pricePerNight: z.number().min(1, "First Name is required"),
  //   imageFiles: z
  //     .any()
  //     // .refine((files) => files?.length == 1, "Image is required.")
  //     // .refine(
  //     //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     //   `Max file size is 5MB.`
  //     // )
  //     // .refine(
  //     //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     //   ".jpg, .jpeg, .png and .webp files are accepted."
  //     // )
  //     .optional(),
  imageUrls: z.string().array().min(1, "Images are required"),
  starRating: z.number().min(1, "A rating is required").max(5),
  lastUpdated: z.date(),
});

export const BookingFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  adultCount: z.number().min(1),
  childCount: z.number().min(1),
  email: z.string().email().min(1),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  hotelId: z.string().min(1),
  paymentIntentId: z.string().min(1),
  totalCost: z.number().min(1),
});
