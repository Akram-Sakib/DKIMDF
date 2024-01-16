import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { AdminClient } from "@/components/ui/dashboard/admin-tables/cilent";
import { users } from "@/constants/data";
const breadcrumbItems = [{ title: "Admins", link: "/dashboard/admins" }];

const UserPage = () => {
  // const title = "Admins";
  // const description = "Admins of the system";

  // const countries = [
  //   { id: 1, imgUrl: BgPressImg, name: "Bangladesh", url: "/bangladesh" },
  //   { id: 2, imgUrl: BgPressImg, name: "India", url: "/india" },
  //   { id: 3, imgUrl: BgPressImg, name: "Thailand", url: "/thailand" },
  // ];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        {/* <Heading title={title} description={description} />
        <section className="py-8 grid grid-cols-3 gap-x-10">
          {countries.map(({ id, imgUrl, name, url}) => (
            <Link href={`/dashboard/admins/${url}`} key={id}>
              <figure className="rounded-3xl relative group overflow-hidden">
                <picture>
                  <BlurImage
                    image={imgUrl}
                    alt="Web development"
                  />
                </picture>
                <figcaption className="absolute bottom-4 left-4 bg-gray-700 rounded-3xl z-10">
                  <Button variant={"outline"}>{name}</Button>
                </figcaption>
                <div className="absolute inset-0 bg-gray-700 opacity-40 rounded-3xl invisible group-hover:visible  transition-all duration-500"></div>
              </figure>
            </Link>
          ))}
        </section> */}
        <AdminClient data={users} />
      </div>
    </>
  );
};

export default UserPage;
