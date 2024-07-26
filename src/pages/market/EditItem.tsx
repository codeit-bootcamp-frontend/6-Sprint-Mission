import MainLayout from "components/Layout";
import GNB from "components/Navbar";
import { EditItemForm } from "templates/EditItem";

export default function EditItemPage() {
  return (
    <>
      <GNB />
      <MainLayout>
        <EditItemForm />
      </MainLayout>
    </>
  );
}
