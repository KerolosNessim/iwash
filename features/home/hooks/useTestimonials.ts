import { useQuery } from "@tanstack/react-query";
import { getTestimonial } from "../services/get-testimonial";

export const useTestimonials = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonial,
  });


  return { 
    testimonials: data?.data || [], 
    isLoading,
    error 
  };
};