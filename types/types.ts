import { JWTPayload } from "jose";

export interface RegisterType {
  us_username: string;
  us_email: string;
  us_password: string;
  us_phone_number: string;
  confirmPassword?: string;
}

export interface LoginType {
  input: string;
  us_password: string;
}

export interface ForgotPasswordType {
  us_email: string;
}

export interface UpdateResetPasswordType {
  us_password: string;
  confirmPassword?: string;
}

export interface CategoryCardType {
  ct_name: string;
  ct_code: string;
  ct_game_publisher: string;
  ct_image: string;
}

export interface CategoryDetailType {
  ct_id: number;
  ct_name: string;
  ct_code: string;
  ct_game_publisher: string;
  ct_image: string;
  ct_image_cover: string;
  ct_currency_type: string;
  ct_currency_type_image: string;
  ct_steps: JSON;
}

export interface ProductDetailType {
  pr_id: string;
  pr_name: string;
  pr_price: number;
  pr_quantity: number;
}

export interface OrderType {
  account_name: string;
  account_id: number;
  order_email: string;
  id?: number;
  name?: string;
  quantity?: number;
  price?: number;
  or_platform_token?: string;
}

export interface OrderProductType {
  pr_id?: number;
  pr_name?: string;
  pr_price?: number;
  pr_quantity?: number;
}

export interface OrderResponseType {
  oi_product: OrderType[];
  or_total_amount: number;
  userId: number;
  email: string;
  voucher_code?: string | null;
}

export interface UserType {
  us_id: number;
  us_username: string;
  us_email: string;
  us_phone_number: string;
  us_is_admin: boolean;
  us_is_active: boolean;
  iat: number;
  exp: number;
}

export function isUserPayload(
  payload: JWTPayload | UserType
): payload is UserType {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "us_id" in payload &&
    "us_username" in payload &&
    "us_email" in payload &&
    "us_phone_number" in payload &&
    "us_is_admin" in payload &&
    "us_is_active" in payload &&
    "iat" in payload &&
    "exp" in payload
  );
}
