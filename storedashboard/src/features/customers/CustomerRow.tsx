import { FiMoreVertical } from "react-icons/fi";
import { CustomerInfoSerialized } from "../../types/Customer";
import Table from "../../ui/Table";

type CustomerRowProps = {
  customer: CustomerInfoSerialized;
  customeStyles?: string;
};

const CustomerRow = ({ customer, customeStyles }: CustomerRowProps) => {
  const {
    id,
    email,
    userName,
    firstName,
    lastName,
    phoneNumber,
    birthDate,
    memberShip,
    lastLogin,
    Active,
  } = customer;
  return (
    <Table.Row customeStyles={customeStyles}>
      <td>{id}</td>
      <td>{email}</td>
      <td>{userName}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{phoneNumber}</td>
      <td>{birthDate}</td>
      <td>{memberShip}</td>
      <td>{lastLogin ? lastLogin : "-"}</td>
      <td className={Active ? "text-green-500" : "text-orange-600"}>{Active ? "Yes" : "No"}</td>
      <td>
        <FiMoreVertical size={24} className="m-auto" />
      </td>
    </Table.Row>
  );
};

export default CustomerRow;
