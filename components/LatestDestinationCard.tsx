import { HotelFormType } from "@/types";
import Link from "next/link";

type Props = {
  hotel: HotelFormType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      href={`/hotels/${hotel._id}`}
      className='relative cursor-pointer overflow-hidden rounded-md'
    >
      <div className='h-[300px]'>
        <img
          alt={hotel.name}
          src={hotel.imageUrls[0]}
          className='w-full h-full object-cover object-center'
        />
      </div>

      <div className='absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md'>
        <span className='text-white font-bold tracking-tight text-3xl'>
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
