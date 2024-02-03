import { FiMoreVertical } from "react-icons/fi";
import { ProductInfo } from "../../types/Product";
import Table from "../../ui/Table";

type ProdcutRowProps = {
  product: ProductInfo;
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

export default ProdcutRow;