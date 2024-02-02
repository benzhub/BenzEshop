import { type PropsWithChildren } from "react";
import ProductTable from "../features/products/ProductTable";
import { PageLayout } from "../ui/PageLayout";

export type PageLayoutProps = PropsWithChildren<{ title: string }>;

const Product = () => {
  return (
    <PageLayout title="Products">
      <ProductTable />
    </PageLayout>
  );
};

export default Product;
