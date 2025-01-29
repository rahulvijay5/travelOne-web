import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const GetCurrentUser = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/unauthenticated");
  }
  return user;
};

export const userIsSuperAdmin = (email: string) => {
  return email === process.env.SuperAdminEmail;
};

export default GetCurrentUser;
