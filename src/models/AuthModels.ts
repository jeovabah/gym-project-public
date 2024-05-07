export type RegisterRequest = {
  name: string;
  email: string;
  phone: string;
  gender_id: number;
  document: string;
  birthday: string;
};

export type LoginRequest = {
  auth_type: "document" | "phone" | "email";
  user_key: string;
};
