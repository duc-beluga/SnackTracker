export interface SnackDisplay {
  snack_id: number;
  name: string;
  primary_image_url: string;
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
