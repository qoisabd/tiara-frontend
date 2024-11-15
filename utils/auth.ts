import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getJwtSecretKey = () => {
  const secret = process.env.NEXT_JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    if (!verified) {
      return undefined;
    } else {
      return verified;
    }
  } catch {
    return undefined;
  }
};

export function getAccessToken(): string | undefined {
  const cookie = cookies();
  console.log(">>>>><", cookie);
  const user = cookie.get("Authentication")?.value;
  console.log(">>>>><> ini user token", user);
  return user;
}

export function isAuthenticateds(): boolean {
  return !!getAccessToken();
}
