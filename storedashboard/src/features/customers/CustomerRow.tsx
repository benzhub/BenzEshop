import { FiMoreVertical } from "react-icons/fi";
import { CustomerInfo } from "../../types/Customer";
import Table from "../../ui/Table";

type CustomerRowProps = {
  customer: CustomerInfo;
  customeStyles?: string;
};

const CustomerRow = ({ customer, customeStyles }: CustomerRowProps) => {
  const {
    id,
    email,
    username: userName,
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    birth_date: birthDate,
    membership: memberShip,
    last_login: lastLogin,
    is_active: Active,
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
      <td>{Active ? "Yes" : "No"}</td>
      <td>
        <FiMoreVertical size={24} className="m-auto" />
      </td>
    </Table.Row>
  );
};

export default CustomerRow;
