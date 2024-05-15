export interface Ads {
  id: number;
  ad_type: string;
  userId: number;
  locationId: number;
  plate_number: number;
  plate_code: string;
  price: number;
  description: string;
  contact_name: string;
  contact_number: string;
  show_number: number;
  status: string;
  isBanner: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdsTableData {
  rows: Ads[];
}
