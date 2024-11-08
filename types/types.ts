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
