import { NavLink } from "react-router-dom";
import ProductEditStatusModal from "./ProductEditStatusModal";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import { ProductInfoSerialized } from "../../types/Product";
import { FiMoreVertical } from "react-icons/fi";

type ProdcutRowProps = {
  product: ProductInfoSerialized;
  customeStyles?: string;
};

const ProdcutRow = ({ product, customeStyles }: ProdcutRowProps) => {
  const {
    id: productId,
    title,
    unitPrice,
    discount,
    inventory,
    thumb,
    isDeleted,
  } = product;
  return (
    <Table.Row customeStyles={customeStyles}>
      <td>{productId}</td>
      <td>
        <img
          className="m-auto max-w-[5rem] rounded-lg"
          src={thumb}
          alt="thumb"
        />
      </td>
      <td className="text-start">{title}</td>
      <td>{unitPrice - discount}</td>
      <td>{inventory}</td>
      <td>{unitPrice}</td>
      <td>{discount}</td>
      <td className={!isDeleted ? "text-green-500" : "text-orange-600"}>
        {!isDeleted ? "Yes" : "No"}
      </td>
      <td>
        <Modal>
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="">
              <FiMoreVertical size={24} className="m-auto" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 max-w-[6rem] rounded-box bg-base-100 p-2 shadow"
            >
              <li className="m-auto w-[5rem]">
                <Modal.Open opens={!isDeleted ? "delete" : "enable"}>
                  <span>{!isDeleted ? "Disable" : "Enable"}</span>
                </Modal.Open>
              </li>
              <li className="m-auto w-[5rem]">
                <NavLink to={`/product/${productId}/`} data-tip="edit">
                  <span>Edit</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <Modal.Window name={!isDeleted ? "delete" : "enable"}>
            <ProductEditStatusModal
              productId={productId}
              title={title}
              status={!isDeleted ? false : true}
            />
          </Modal.Window>
        </Modal>
      </td>
    </Table.Row>
  );
};

export default ProdcutRow;
