import { apiFetch } from "@/lib/api";
import { HeroResponse } from "../types";

export const getHero = async (): Promise<HeroResponse> => {
  return await apiFetch<HeroResponse>("/v1/hero-section");
};
