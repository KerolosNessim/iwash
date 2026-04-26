// Area
export interface Area {
  id: number;
  name: string;
}

// Car Model
export interface CarModel {
  id: number;
  name: string;
}

// Car Color
export interface CarColor {
  id: number;
  name: string;
  color_code: string;
}

// Schedule
export interface Schedule {
  days: string[];
  start_time: string;
  end_time: string;
}

// Main Data
export interface AppData {
  areas: Area[];
  car_models: CarModel[];
  car_colors: CarColor[];
  schedule: Schedule;
}

// API Response
export interface BookingSetupResponse {
  status: string;
  message: string;
  data: AppData;
}

// Booking Payload
export interface BookingPayload {
  booking_type: string; 
  service_type: "external" | "internal"; 
  area_id: number;
  car_model_id: number;
  car_color_id: number;
  service_package_id: number;
  plate_number: string;
  booking_date: string;
  booking_time: string;
  guest_name: string;
  guest_phone: string;
}

// Booking Response
export interface BookingResponse {
  status: string;
  message: string;
    data: {
        status: string;
        localized_status: string;
    }
}