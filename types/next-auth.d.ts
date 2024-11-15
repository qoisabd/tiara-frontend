import NextAuth from "next-auth";
import { UserType } from "./types";

declare module "next-auth" {
  interface Session {
    user: UserType;
  }

  interface User extends UserType {}
}
