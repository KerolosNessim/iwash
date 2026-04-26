import { useQuery } from "@tanstack/react-query";
import { getActivePackages, getFinishedPackages } from "../services/get-packages";

export const useMyPackages = (activePage: number = 1, finishedPage: number = 1) => {
  const activeQuery = useQuery({
    queryKey: ["my-packages", "active", activePage],
    queryFn: () => getActivePackages(activePage),
  });

  const finishedQuery = useQuery({
    queryKey: ["my-packages", "finished", finishedPage],
    queryFn: () => getFinishedPackages(finishedPage),
  });

  return {
    activePackages: activeQuery.data?.data?.items ?? [],
    finishedPackages: finishedQuery.data?.data?.items ?? [],
    pagination: {
      active: activeQuery.data?.data?.pagination,
      finished: finishedQuery.data?.data?.pagination,
    },
    isLoading: activeQuery.isLoading || finishedQuery.isLoading,
    error: activeQuery.error || finishedQuery.error,
    refetch: () => {
      activeQuery.refetch();
      finishedQuery.refetch();
    },
  };
};
