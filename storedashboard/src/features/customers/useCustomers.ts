import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/apiCustomers";

export function useCustomers() {
  const {
    isLoading,
    data: customers,
    isError, 
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
  return { isLoading, customers, isError, error };
}
