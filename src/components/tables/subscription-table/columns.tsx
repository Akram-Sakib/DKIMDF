"use client";
import { Button } from "@/components/ui/button";
import { Subscription } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format, isAfter } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Subscription>[] = [
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
    cell: ({ row }) => {
      return (
        <span>{`${(row.original as any).member.firstName} ${
          (row.original as any).member.lastName
        }`}</span>
      );
    },
    accessorKey: "member",
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
    accessorKey: "member.email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          key={column.id}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          EMAIL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "member.phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          key={column.id}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PHONE NUMBER
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorFn: (row) => format(new Date(row.startTime), "dd/MM/yyyy HH:mm:ss"),
    accessorKey: "startTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          START TIME
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorFn: (row) => format(new Date(row.endTime), "dd/MM/yyyy HH:mm:ss"),
    accessorKey: "endTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          END TIME
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isExpired",
    cell: ({ row }) => {
      const isExpiredTime = isAfter(new Date(), new Date(row.original.endTime));

      return (
        <div className="">
          {(row as any).isExpired || isExpiredTime ? (
            <Button variant="destructive">Expired</Button>
          ) : (
            <Button variant="default">Running</Button>
          )}
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          IS EXPIRED
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "subscriptionFee.isPaid",
    cell: ({ row }) => {
      const isPaid = (row.original as any).subscriptionFee.isPaid;

      return (
        <div className="">
          {isPaid ? (
            <Button variant="default">Paid</Button>
          ) : (
            <Button variant="destructive">Not Paid</Button>
          )}
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          IS PAID
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
    accessorKey: "subscriptionFee.totalFee",
    header: "TOTAL FEE",
  },
  {
    header: "ACTIONS",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
