"use client";

import { LoginFormSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export type SignInFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    const { email, password } = data;

    const { ok, error, status } = (await signIn("credentials", {
      email,
      password,
      redirect: false,
    })) as SignInResponse;

    if (!error) {
      toast.success("Login Successful!");

      router.back();
    } else {
      toast.error("Invalid Credentials.");
    }
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-3xl font-bold'>Login</h2>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Email
        <input
          type='email'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}
      </label>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )}
      </label>
      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          Not Registered?{" "}
          <Link className='underline' href='/register'>
            Create an account here
          </Link>
        </span>
        <button
          type='submit'
          className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default Login;
