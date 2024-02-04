import { ProductInfoSerialized } from "../../types/Product";
import Spinner from "../../ui/Spinner";
import { useProduct } from "./useProduct";
import { IoImageOutline } from "react-icons/io5";

const ProductDetail = () => {
  const productResult = useProduct();
  if (!productResult) return <ProductForm productInfo={null} />;

  const { isLoading, product } = productResult;
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  return <ProductForm productInfo={product!} />;
};

interface ProductFormProps {
  productInfo: ProductInfoSerialized | null;
}

const ProductForm = ({ productInfo }: ProductFormProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center py-12">
      <h1 className="text-4xl font-extrabold py-4">
        {productInfo ? "Product Details" : "Add Product"}
      </h1>
      <form className="w-[40%] flex flex-col gap-2 font-bold text-xl">
        <h3>ID: {productInfo?.id}</h3>
        <label>Thumb: </label>
        {productInfo?.thumb ? (
          <img className="w-[15rem] m-auto py-4" src={productInfo?.thumb} />
        ) : (
          <IoImageOutline className="w-[15rem] h-[20rem] m-auto"/>
        )}
        <input type="file" className="file-input file-input-bordered file-input-primary w-full" />
        <br />
        <label>Title: </label>
        <input type="text" placeholder="Title" defaultValue={productInfo?.title} className="input input-bordered input-primary w-full" />
        <br />
        <label>Slug: </label>
        <input type="text" placeholder="Slug" defaultValue={productInfo?.slug} className="input input-bordered input-primary w-full" />
        <br />
        <label>Unit Price: </label>
        <input type="text" placeholder="Unit Price" defaultValue={productInfo?.unitPrice} className="input input-bordered input-primary w-full" />
        <br />
        <label>Description: </label>
        <textarea
          className="textarea textarea-primary w-full h-[10rem]"
          placeholder="Description"
          defaultValue={productInfo?.description}
        ></textarea>
        <br />
        <label>Inventory: </label>
        <input type="text" placeholder="Inventory" defaultValue={productInfo?.inventory} className="input input-bordered input-primary w-full" />
        <br />
        <label>Discount: </label>
        <input type="text" placeholder="Discount" defaultValue={productInfo?.discount} className="input input-bordered input-primary w-full" />
        <br />
        <label>Active: </label>
        <input
          type="checkbox"
          className="toggle toggle-info"
          defaultChecked={productInfo?.isDeleted ? false : true}
        />
        <br />
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default ProductDetail;
