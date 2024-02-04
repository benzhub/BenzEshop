import CustomerTable from "../features/customers/CustomerTable"
import { PageLayout } from "../ui/PageLayout"

const Customers = () => {
  return (
    <PageLayout title="Customer">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold">Customers</h1>
      </div>
      <CustomerTable/>
    </PageLayout>
  )
}

export default Customers