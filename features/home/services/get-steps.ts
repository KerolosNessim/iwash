import { apiFetch } from "@/lib/api";
import { WorkStepsResponse } from "../types";

export const getWorkSteps = async (): Promise<WorkStepsResponse> => {
  return await apiFetch<WorkStepsResponse>("/v1/work-steps");
};