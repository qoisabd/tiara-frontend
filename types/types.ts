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
  ct_game_publisher: string;
  ct_image: string;
}
