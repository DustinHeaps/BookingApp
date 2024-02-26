"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Header = () => {
  const session = useSession();
  const router = useRouter();
  const handleSignout = async () => {
    await signOut();
    toast.success("Signed Out Successful");
    router.push("/");
  };

  return (
    <div className='bg-blue-800 py-6'>
      <div className='container mx-auto flex justify-between'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link href='/'>Vacations.com</Link>
        </span>
        <span className='flex space-x-2'>
          {session.data?.user?.id ? (
            <>
              <Link
                className='flex items-center text-white px-3 font-bold hover:bg-blue-600'
                href='/my-bookings'
              >
                My Bookings
              </Link>
              <Link
                className='flex items-center text-white px-3 font-bold hover:bg-blue-600'
                href='/my-hotels'
              >
                My Hotels
              </Link>
              <button
                onClick={handleSignout}
                className='text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 '
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href='/login'
              className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100'
            >
              Login
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
