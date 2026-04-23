import { apiFetch } from "@/lib/api";
import { WhyChooseUsResponse } from "../types";

export const getWhyChoose = async (): Promise<WhyChooseUsResponse> => {
  return await apiFetch<WhyChooseUsResponse>("/v1/why-choose-us");
};
