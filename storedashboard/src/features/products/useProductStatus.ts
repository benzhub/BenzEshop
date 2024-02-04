import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setProductStatus as apiSetProductStatus } from "../../services/apiProducts";
import toast from "react-hot-toast";
import { ProductEditStatusProps } from "../../types/Product";

export function useProductStatus() {
  const queryClient = useQueryClient();
  const {mutate: editStatus, isPending, isSuccess} = useMutation({
    mutationFn: (productStatus: ProductEditStatusProps) =>
      apiSetProductStatus(productStatus),
    onSuccess: () => {
      toast.success("The product status has changed.");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editStatus, isPending, isSuccess };
}
