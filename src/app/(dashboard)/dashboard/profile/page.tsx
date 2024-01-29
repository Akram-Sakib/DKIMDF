// import { CreateProfileOne } from "@/components/forms/user-profile-stepper/create-profile";
import { getUsers } from "@/app/api/v1/users/users.actions";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import CreateProfileOne from "@/components/ui/dashboard/create-profile";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default async function page() {

  const users = await getUsers()
  console.log(users);
  
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <CreateProfileOne />
      </div>
    </>
  );
}
