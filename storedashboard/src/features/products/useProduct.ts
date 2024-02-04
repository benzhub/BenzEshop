import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";
import { useParams } from "react-router-dom";
import { z } from "zod";
import toast from "react-hot-toast";

const productIdSchema = z.string().regex(/^\d+$/).min(1).max(10000);

export function useProduct() {
  const { productId } = useParams<{ productId: string }>();
  if (!productId) {
    return;
  }
  const validation = productIdSchema.safeParse(productId);
  if (!validation.success) {
    toast.error(
      "Invalid productId. Please provide a number between 1 and 10000.",
    );
    return;
  }
  const {isLoading, data: product, error, isError} = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(Number(productId)),
    retry: false,
  });
  if (isError) {
    toast.error(error.message);
  }
  return { isLoading, product, isError, error };
}
