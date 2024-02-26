"use server";
import { LoginType, RegisterType } from "./../types/index.d";

import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function registerUser(userData: RegisterType) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function login(userData: LoginType) {
  try {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return { message: "Invalid Credentials" };
    }

    const isMatch = await bcrypt.compare(userData.password, user!.password);

    if (!isMatch) {
      return { message: "Invalid Credentials" };
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ id: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
