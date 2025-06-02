export interface SnackDisplay {
  snack_id: number;
  name: string;
  primary_image_url: string;
  image_count: number;
  like_count: number;
}

export enum Location {
  Home = "Home",
  Liked = "Liked",
  Uploaded = "Uploaded",
  Trending = "Trending",
  Search = "Search",
}

export interface SnackCityAndState {
  city: string;
  state: string;
  location_count: number;
}

export interface ImageLocation {
  image_location_id: number;
  image_url: string;
  snack_address: string;
  like_count: number;
  like_id: number | null;
}

export interface SnackDetail {
  snack_id: number;
  name: string;
  images_locations: ImageLocation[];
}
