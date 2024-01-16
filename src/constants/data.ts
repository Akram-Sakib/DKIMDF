import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    email: "dell@gmail.com",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    email: "techcorp@gmail.com",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "webtech@gmail.com",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    email: "innovative@gmail.com",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    email: "techguru@gmail.com",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    email: "codegenius@yahoo.com",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    email: "softworks@gmail.com",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    email: "dev.craft@hotmail.com",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    email: "websolutions@gmail.com",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    email: "datatech@gmail.com",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
  {
    id: 11,
    name: "James Brown",
    email: "codegenius@yahoo.com",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 12,
    name: "Laura White",
    email: "softworks@gmail.com",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 13,
    name: "Michael Lee",
    email: "dev.craft@hotmail.com",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 14,
    name: "Olivia Green",
    email: "websolutions@gmail.com",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 15,
    name: "Robert Taylor",
    email: "datatech@gmail.com",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
  {
    id: 16,
    name: "Candice Schiner",
    email: "dell@gmail.com",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 17,
    name: "John Doe",
    email: "techcorp@gmail.com",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 18,
    name: "Alice Johnson",
    email: "webtech@gmail.com",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 19,
    name: "David Smith",
    email: "innovative@gmail.com",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 20,
    name: "Emma Wilson",
    email: "techguru@gmail.com",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 21,
    name: "James Brown",
    email: "codegenius@yahoo.com",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 22,
    name: "Laura White",
    email: "softworks@gmail.com",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 23,
    name: "Michael Lee",
    email: "dev.craft@hotmail.com",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 24,
    name: "Olivia Green",
    email: "websolutions@gmail.com",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 25,
    name: "Robert Taylor",
    email: "datatech@gmail.com",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
  {
    id: 26,
    name: "James Brown",
    email: "codegenius@yahoo.com",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 27,
    name: "Laura White",
    email: "softworks@gmail.com",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 28,
    name: "Michael Lee",
    email: "dev.craft@hotmail.com",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 29,
    name: "Olivia Green",
    email: "websolutions@gmail.com",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 30,
    name: "Robert Taylor",
    email: "datatech@gmail.com",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Admins",
    href: "/dashboard/admins",
    icon: "admin",
    label: "admins",
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: "user",
    label: "users", 
  },
  {
    title: "Payments",
    href: "/dashboard/payment",
    icon: "banknote",
    label: "users", 
  },
  {
    title: "Logout",
    href: "/",
    icon: "login",
    label: "logut",
  },
];

export const options = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Transgender",
    value: "transgender",
  },
];
