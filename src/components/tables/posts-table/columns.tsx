"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Post>[] = [
  // {
  //   id: "SERIAL",
  //   header: ({ table }) => (
  //     <>SERIAL</>
  //     // <Checkbox
  //     //   checked={table.getIsAllPageRowsSelected()}
  //     //   onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //     //   aria-label="Select all"
  //     // />
  //   ),
  //   cell: ({ row, cell }) => {
  //     return (
  //       <>
  //         {/* <Checkbox
  //           checked={row.getIsSelected()}
  //           onCheckedChange={(value) => row.toggleSelected(!!value)}
  //           aria-label="Select row"
  //         /> */}
  //       </>
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // make a tanstack serial number cell which will be dynamic
  {
    id: "SERIAL",
    header: "SERIAL",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row, table }) => {
      const index = row.index + 1;
      const pageSize = table.getState().pagination.pageSize;
      const pageIndex = table.getState().pagination.pageIndex;
      return <span>{index + pageSize * pageIndex}</span>;
    },
  },
  // imageUrl
  {
    accessorKey: "imageUrl",
    header: "IMAGE",
    cell: ({ row }) => {
      return (
        <Avatar>
          {/* @ts-ignore */}
          <AvatarImage src={row.original.imageUrl} alt="user" />
          {/* <AvatarFallback>
            {row.original.firstName[0].toUpperCase() +
              row.original.lastName[0].toUpperCase()}
          </AvatarFallback> */}
        </Avatar>
      );
    },
  },
  {
    cell: ({ row }) => {
      return (
        <span>{`${row.original.title}`}</span>
      );
    },
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          NAME
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    cell: ({ row }) => {
      return (
        <span>{`${row.original.description}`}</span>
      );
    },
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          NAME
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorFn: (row) => format(new Date(row.createdAt), "dd/MM/yyyy HH:mm:ss"),
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          key={column.id}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CREATED AT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    accessorFn: (row) => format(new Date(row.updatedAt), "dd/MM/yyyy HH:mm:ss"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          key={column.id}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UPDATED AT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "ACTIONS",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
