import { useProducts } from "./useProducts";
import ProdcutRow from "./ProductRow";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import { ProductInfo } from "../../types/Product";


const ProductTable = () => {
  const TABLEBASESTYLE = "grid grid-cols-[0.6fr_1fr_4fr_1fr_1fr_1fr_1fr_1fr] gap-4 bg-neutral items-center text-center p-4 font-extrabold text-lg border border-primary-content";
  const { isLoading, products, isError, error } = useProducts();

  if (isLoading) return <div className="pt-12"><Spinner /></div>;
  if(isError) return <p className="text-xl font-bold text-accent">Error Message: {error?.message}</p>
  if (!products?.length) return <Empty resourceName="products" />;
  return (
    <Table baseStyles={`${TABLEBASESTYLE}`}>
      <Table.Header>
        <td>ID</td>
        <td>Thumb</td>
        <td>Title</td>
        <td>Price</td>
        <td>Inventory</td>
        <td>Unit Price</td>
        <td>Discount</td>
        <td>Edit</td>
      </Table.Header>

      <Table.Body
        data={products}
        render={(product: ProductInfo) => (
          <ProdcutRow
            key={product.id}
            product={product}
            customeStyles="delay-50 transition-colors duration-300 ease-in-out hover:bg-gray-700"
          />
        )}
      />
    </Table>
  );
};

export default ProductTable;
