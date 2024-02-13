"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Country } from "@prisma/client";
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Country>[] = [
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
  {
    accessorKey: "name",
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
