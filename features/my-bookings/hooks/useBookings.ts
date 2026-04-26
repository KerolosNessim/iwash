import { useQuery } from "@tanstack/react-query";
import { getInProgressBookings, getCompletedBookings } from "../services/get-bookings";

export const useBookings = (pendingPage: number = 1, completedPage: number = 1) => {
  const inProgressQuery = useQuery({
    queryKey: ["bookings", "in-progress", pendingPage],
    queryFn: () => getInProgressBookings(pendingPage),
  });

  const completedQuery = useQuery({
    queryKey: ["bookings", "completed", completedPage],
    queryFn: () => getCompletedBookings(completedPage),
  });

  return {
    inProgressBookings: inProgressQuery.data?.data?.items ?? [],
    completedBookings: completedQuery.data?.data?.items ?? [],
    pagination: {
      pending: inProgressQuery.data?.data?.pagination,
      completed: completedQuery.data?.data?.pagination,
    },
    isLoading: inProgressQuery.isLoading || completedQuery.isLoading,
    error: inProgressQuery.error || completedQuery.error,
    refetch: () => {
      inProgressQuery.refetch();
      completedQuery.refetch();
    },
  };
};
