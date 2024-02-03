import { CustomerInfo } from "../../types/Customer";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./useCustomers";

const CustomerTable = () => {
  const TABLEBASESTYLE = "grid grid-cols-[0.6fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 bg-neutral items-center text-center p-4 font-extrabold text-lg border border-primary-content";
  const { isLoading, customers, isError, error } = useCustomers();
  //   console.log(isLoading);
  //   console.log(customers);
  //   console.log(isError);
  //   console.log(error);
  if (isLoading)
    return (
      <div className="pt-12">
        <Spinner />
      </div>
    );
  if (isError)
    return (
      <p className="text-xl font-bold text-accent">
        Error Message: {error?.message}
      </p>
    );
  if (!customers?.length) return <Empty resourceName="products" />;
  return (
    <Table baseStyles={`${TABLEBASESTYLE}`}>
      <Table.Header>
        <td>ID</td>
        <td>Email</td>
        <td>UserName</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Phone Number</td>
        <td>Birth Date</td>
        <td>Membership</td>
        <td>Last Login</td>
        <td>Active</td>
        <td>Edit</td>
      </Table.Header>
      <Table.Body
        data={customers}
        render={(customer: CustomerInfo) => (
          <CustomerRow
            key={customer.id}
            customer={customer}
            customeStyles="delay-50 transition-colors duration-300 ease-in-out hover:bg-gray-700"
          />
        )}
      />
    </Table>
  );
};

export default CustomerTable;
