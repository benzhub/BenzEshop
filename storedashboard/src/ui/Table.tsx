import { PropsWithChildren, ReactNode, createContext, useContext } from "react";

type StylesProps = {
  baseStyles: string;
};

type TableContextValue = StylesProps;

type TableProps = StylesProps & {
  children: ReactNode;
};

type RowProps = {
  children: ReactNode;
  customeStyles?: string;
};

type BodyProps<T> = {
  data: T[];
  render: (item: T) => ReactNode;
};

const TableContext = createContext<TableContextValue | null>(null);

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

function Row({ children, customeStyles }: RowProps) {
  const contextValue = useContext(TableContext);
  if (!contextValue) return null;
  const { baseStyles } = contextValue;
  return <tr className={`${baseStyles} ${customeStyles}`}>{children}</tr>;
}

const Body = <T,>({ data, render }: BodyProps<T>) => {
  if (data.length === 0) return <p>No data to show at the moment</p>;
  return <tbody>{data.map(render)}</tbody>;
};
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;