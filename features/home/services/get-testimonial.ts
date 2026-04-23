import { apiFetch } from "@/lib/api";
import {  TestimonialResponse } from "../types";

export const getTestimonial = async (): Promise<TestimonialResponse> => {
  return await apiFetch<TestimonialResponse>("/portfolio-items");
};
