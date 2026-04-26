import { useMutation } from "@tanstack/react-query";
import { addBooking } from "../services/add-booking";
import { BookingPayload, BookingResponse } from "../types";
import { toast } from "sonner";

export const useAddBooking = () => {
  return useMutation<BookingResponse, Error, BookingPayload>({
    mutationFn: addBooking,
    onSuccess: (data) => {
      toast.success(data.message || "Booking confirmed successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to confirm booking.");
    },
  });
};
