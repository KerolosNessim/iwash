export interface BookingItem {
  id: number;
  order_number: string | null;
  status: string;
  localized_status: string;
  booking_type: "single" | "monthly";
  service_type: "internal" | "external";
  price: number;
  booking_date: string;
  booking_time: string;
  details: {
    area: {
      id: number;
      name: string;
    };
    address: string | null;
    package: {
      id: number;
      name: string;
      duration: string;
      image: string;
      is_popular: boolean;
      selected_price: number;
    };
    car: {
      plate_number: string;
      model: {
        id: number;
        name: string;
      };
      color: {
        id: number;
        name: string;
        color_code: string;
      };
    };
  };
  created_at: string;
}

export interface BookingsResponse {
  status: string;
  message: string;
  data: {
    items: BookingItem[];
    pagination: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
  };
}
