import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { ProductForm } from "@/components/ui/dashboard/product-form";

export default function Page() {
  const breadcrumbItems = [
    { title: "Admins", link: "/dashboard/admins" },
    { title: "Create", link: "/dashboard/admins/create" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <ProductForm
        categories={[
          { _id: 1, label: "Super Admin", value: "super_admin" },
          { _id: 2, label: "Admin", value: "admin" },
        ]}
        initialData={null}
        key={null}
      />
    </div>
  );
}
