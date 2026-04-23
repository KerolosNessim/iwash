import { apiFetch } from "@/lib/api";
import { PortfolioResponse } from "../types";

export const getPortfolio = async (): Promise<PortfolioResponse> => {
  return await apiFetch<PortfolioResponse>("/portfolio");
};
