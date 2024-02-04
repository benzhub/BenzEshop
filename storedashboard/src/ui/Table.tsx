import { PropsWithChildren, ReactNode, createContext, useContext } from "react";

type StylesProps = {
  baseStyles: string;
};

type TableContextValue = StylesProps;

type TableProps = StylesProps & {
  children: ReactNode;
};

const TableContext = createContext<TableContextValue | null>(null);

const useTableContext = () => {
  const contextValue = useContext(TableContext);
  if (!contextValue)
    throw new Error(
      "useTableContext must be used within a TableContextProvider",
    );
  return contextValue;
};

function Table({ baseStyles, children }: TableProps) {
  return (
    <TableContext.Provider value={{ baseStyles }}>
      <table>{children}</table>
    </TableContext.Provider>
  );
}

function Header({ children }: PropsWithChildren) {
  const contextValue = useTableContext();
  const { baseStyles } = contextValue;
  return (
    <thead>
      <tr className={`${baseStyles} rounded-t-xl`}>{children}</tr>
    </thead>
  );
}

type RowProps = {
  children: ReactNode;
  customeStyles?: string;
};

function Row({ children, customeStyles }: RowProps) {
  const contextValue = useTableContext();
  const { baseStyles } = contextValue;
  return <tr className={`${baseStyles} last:rounded-b-xl ${customeStyles}`}>{children}</tr>;
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

export default Table;
