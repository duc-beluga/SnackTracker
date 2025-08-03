export interface SnackDisplay {
  snack_id: number;
  name: string;
  brand: string;
  primary_image_url: string;
  location_count: number;
  like_count: number;
}

export enum Location {
  Home = "Home",
  Liked = "Liked",
  Uploaded = "Uploaded",
  Trending = "Trending",
  Search = "Search",
  Location = "Location",
}

export interface SnackCityAndState {
  city: string;
  state: string;
  location_count: number;
}

export interface ImageLocation {
  image_location_id: number;
  image_url: string;
  address: string;
  city: string;
  state: string;
  aisle: string;
  like_count: number;
  like_id: number | null;
  uploaded_at: string;
}

export interface SnackDetail {
  snack_id: number;
  name: string;
  images_locations: ImageLocation[];
}

export type SnackName = {
  name: string;
  snack_id: number;
};

export type SnackBrand = {
  brand_id: number;
  name: string;
};

export enum TrendingType {
  Today = 1,
  ThisWeek = 7,
  ThisMonth = 30,
  AllTime = 9999,
}

export enum ItemCategory {
  Snack = "Snack",
  Drink = "Drink",
  Other = "Other",
}
