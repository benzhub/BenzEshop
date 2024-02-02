import { PropsWithChildren, ReactNode, createContext, useContext } from "react";
import { useProducts } from "./useProducts";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { FiMoreVertical } from "react-icons/fi";

type StylesProps = {
  baseStyles: string;
};
type TableContextValue = StylesProps;
const TableContext = createContext<TableContextValue | null>(null);

type TableProps = StylesProps & {
  children: ReactNode;
};

function Table({ baseStyles, children }: TableProps) {
  return (
    <TableContext.Provider value={{ baseStyles }}>
      <table className="overflow-hidden rounded-xl">{children}</table>
    </TableContext.Provider>
  );
}

function Header({ children }: PropsWithChildren) {
  const contextValue = useContext(TableContext);
  if (!contextValue) return null;
  const { baseStyles } = contextValue;
  return (
    <thead>
      <tr className={baseStyles}>{children}</tr>
    </thead>
  );
}

type RowProps = {
  children: ReactNode;
  customeStyles?: string;
};

function Row({ children, customeStyles }: RowProps) {
  const contextValue = useContext(TableContext);
  if (!contextValue) return null;
  const { baseStyles } = contextValue;
  return (
    <tr className={`${baseStyles} ${customeStyles}`}>
      {children}
    </tr>
  );
}

type BodyProps<T> = {
  data: T[];
  render: (item: T) => ReactNode;
};

const Body = <T,>({ data, render }: BodyProps<T>) => {
  if (data.length === 0) return <p>No data to show at the moment</p>;
  return <tbody>{data.map(render)}</tbody>;
};
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

type ProductProps = {
  id: number;
  title: string;
  unit_price: number;
  discount: number;
  inventory: number;
  thumb: string;
};

type ProdcutRowProps = {
  product: ProductProps;
  customeStyles?: string;
};

const ProdcutRow = ({ product, customeStyles }: ProdcutRowProps) => {
  const {id, title, unit_price: unitPrice, discount, inventory, thumb} = product;
  return (
      <Table.Row customeStyles={customeStyles}>
        <td>{id}</td>
        <td>
          <img className="m-auto max-w-[5rem] rounded-lg" src={thumb} alt="thumb"/>
        </td>
        <td className="text-start">{title}</td>
        <td>{unitPrice - discount}</td>
        <td>{inventory}</td>
        <td>{unitPrice}</td>
        <td>{discount}</td>
        <td>
          <FiMoreVertical size={24} className="m-auto" />
        </td>
      </Table.Row>
  );
};

const ProductTable = () => {
  const tableBaseStyle =
    "grid grid-cols-[0.6fr_1fr_4fr_1fr_1fr_1fr_1fr_1fr] gap-4 bg-neutral items-center text-center p-4 font-extrabold text-lg border border-primary-content";
  const { isLoading, products, isError, error } = useProducts();
  // console.log(isLoading);
  // console.log(products);
  // console.log(error);

  if (isLoading)
    return (
      <div className="pt-12">
        <Spinner />
      </div>
    );
  if(isError) {
    return <p className="text-xl font-bold text-accent">Error Message =&gt; {error?.message}</p>
  }
  if (!products?.length) return <Empty resourceName="products" />;
  return (
    <Table baseStyles={`${tableBaseStyle}`}>
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
        render={(product: ProductProps) => (
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
