export interface UserDetails {
  id: number;
  email: string | null;
  phone: string;
  full_name: string | null;
  verification_code: string;
  is_verified: number;
  dob: string | null;
  gender: string | null;
  locationId: number | null;
  username: string;
  userId: string;
  authToken: string;
  rc_name: string | null;
  device_token: string;
  language: string;
  role: string;
  deletedAt: string | null;
  is_active: number;
  createdAt: string;
  updatedAt: string;
  location: any;
  number_ads_count: number;
}
