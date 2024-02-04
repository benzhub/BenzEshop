import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import { useProductStatus } from "./useProductStatus";

type ProductDisableFormProps = {
  productId: number;
  status: boolean
  title: string;
  onCloseModal?: () => void;
};

const ProductEditStatusModal = ({productId, title, status, onCloseModal}: ProductDisableFormProps) => {
  const { editStatus, isPending, isSuccess } = useProductStatus();

  useEffect(()=>{
    if(isSuccess) {
      onCloseModal?.()
    }
  }, [isSuccess, onCloseModal])

  if(isPending) return <Spinner/>
  return (
    <div className="flex flex-col items-start gap-4 text-lg font-bold">
      <h3 className={`text-2xl ${status ? 'text-green-500' : 'text-orange-600' }`}>{status ? 'Enable' : 'Disable' } Product!!</h3>
      <p>Product ID: {productId}</p>
      <p>Product title: {title}</p>
      <p className="text-xl">
        Are you sure you want to {status ? 'enable' : 'disable' } this product status?
      </p>
      <button
        aria-label={`Yes, ${status ? 'Enable' : 'Disable' } this Product.`}
        className="btn btn-warning"
        onClick={() => editStatus({productId, status})}
      >
        Yes, {status ? 'Enable' : 'Disable' } this Product.
      </button>
    </div>
  );
};

export default ProductEditStatusModal;
