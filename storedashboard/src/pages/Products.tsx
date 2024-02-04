import { type PropsWithChildren } from "react";
import ProductTable from "../features/products/ProductTable";
import { PageLayout } from "../ui/PageLayout";
import { NavLink } from "react-router-dom";

export type PageLayoutProps = PropsWithChildren<{ title: string }>;

const Products = () => {
  return (
    <PageLayout title="Products">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <div>
          <NavLink to={`/product/`} data-tip="add">
            <button className="btn btn-primary text-xl">Add Product</button>
          </NavLink>
        </div>
      </div>
      <ProductTable />
    </PageLayout>
  );
};

export default Products;
