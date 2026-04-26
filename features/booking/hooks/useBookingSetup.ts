import { useQuery } from "@tanstack/react-query";
import { getBookingSetup } from "../services/get-booking-setup";
import { BookingSetupResponse } from "../types";

export const useBookingSetup = () => {
  const { data, isLoading, error } = useQuery<BookingSetupResponse>({
    queryKey: ["booking-setup"],
    queryFn: getBookingSetup,
  });


  return { 
    areas: data?.data.areas || [], 
    car_models: data?.data.car_models || [],
    car_colors: data?.data.car_colors || [],
    schedule: data?.data.schedule || [],
    isLoading,
    error 
  };
};