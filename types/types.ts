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
  category_name?: string;
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

export interface OrderHistoryType {
  or_id: number;
  or_us_id: number;
  or_status: "pending" | "settlement" | "cancelled" | "default";
  or_platform_id: string;
  or_vaNumber: { bank: string; va_number: string }[];
  or_total_amount: number;
  category_name?: string;
  or_created_at: string;
  orderItem: OrderItemType;
}

export interface OrderStatusType {
  value: "pending" | "settlement" | "cancelled" | "default";
  label: string;
  color: string;
}

export interface OrderProductType {
  account_id: number;
  account_name: string;
  id: number;
  name: string;
  quantity: number;
  price: number;
  order_email: string;
  category_name?: string;
  type: string;
}

export interface OrderItemType {
  oi_id: number;
  oi_or_id: number;
  oi_product: OrderProductType[];
}
