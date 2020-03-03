import axios from "axios";
import { UserSubmit, UserReponse } from "@/store/models";

export const loginUser = async (user: UserSubmit): Promise<UserReponse> => {
  try {
    const response = await axios.post("/auth/login", user);
    console.log("response", response);
    return response.data as UserReponse;
  } catch (error) {
    throw new Error(error);
  }
};
