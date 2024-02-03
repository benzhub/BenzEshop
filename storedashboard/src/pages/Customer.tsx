import CustomerTable from "../features/customers/CustomerTable"
import { PageLayout } from "../ui/PageLayout"

const Customer = () => {
  return (
    <PageLayout title="Customer">
      <CustomerTable/>
    </PageLayout>
  )
}

export default Customer