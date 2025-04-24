export interface SnackDisplay {
  snack_id: number;
  name: string;
  primary_image_url: string;
}

export interface SnackLike {
  like_id: number;
  user_id: number;
  snack_id: number;
}

export interface SnackImage {
  snack_id: number;
  image_id: number;
  image_url: string;
}

export interface SnackImageLocationVal {
  image_location_id: number;
  image_url: string;
  snack_address: string;
}

export interface SnackDetails {
  images_locations: SnackImageLocationVal[];
  like_data: SnackLike | null;
  like_count: number;
}

export interface SnackImageLocation {
  snack_id: number;
  image_location_id: number;
  image_url: string;
  snack_address: string;
}

export enum Location {
  Home = "Home",
  Liked = "Liked",
  Uploaded = "Uploaded",
}
