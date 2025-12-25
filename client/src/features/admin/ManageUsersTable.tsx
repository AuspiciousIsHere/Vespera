import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import { CircleCheck, CircleX, EllipsisVertical, Eye, Trash, UserRound } from "lucide-react";
import { useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Menu, MenuGroup, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu";
import ConfirmDeleteUserDialog from "./ConfirmDeleteUserDialog";
import { Checkbox } from "@/components/ui/checkbox";
import useGetAllUsers from "./hooks/useGetAllUsers";
import UserDetailsDialog from "./UserDetailsDialog";
import PageSpinner from "@/ui/PageSpinner";
import type { User } from "@/types/user";
import { USER_IMAGE_URL } from "@/constant/constants";

const userTableColumsn: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select Row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "picture",
    header: "Picture",
    cell: ({ row }) => {
      console.log(row.original);
      const userPicture = row.getValue("picture");

      return (
        <div className="size-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
          {userPicture && userPicture !== "default-user.png" ? (
            <img src={`${USER_IMAGE_URL}/${userPicture}`} alt={row.getValue("username")} className="" />
          ) : (
            <UserRound className="size-7" />
          )}
        </div>
      );
    },
  },
  {
    id: "patient-name",
    header: "Patient Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ row }) => (
      <div>
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => row.getValue("username"),
  },
  {
    accessorKey: "email",
    header: "Eamil",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (row.getValue("active") ? <CircleCheck className="text-emerald-500" /> : <CircleX className="text-red-500" />),
  },
  {
    accessorKey: "followers",
    header: "Followers",
    cell: ({ row }) => {
      const followers: string[] = row.getValue("followers");
      return followers.length;
    },
  },
  {
    accessorKey: "following",
    header: "Following",
    cell: ({ row }) => {
      console.log(row.getValue("active"));
      const followers: string[] = row.getValue("following");
      return followers.length;
    },
  },
  {
    id: "mneu",
    cell: () => {
      const [showConfirmDeleteUserDialog, setShowConfirmDeleteUserDialog] = useState(false);
      const [showUserDetailsDialog, setShowUserDetailsDialog] = useState(false);

      return (
        <Menu>
          <MenuTrigger>
            <EllipsisVertical />
          </MenuTrigger>

          <MenuPopup>
            <MenuGroup>
              <MenuItem onClick={() => setShowUserDetailsDialog(true)}>
                <Eye />
                Details
              </MenuItem>

              <MenuItem onClick={() => setShowConfirmDeleteUserDialog(true)} className="text-red-400">
                <Trash className="size-4" />
                Delete
              </MenuItem>
            </MenuGroup>
          </MenuPopup>

          <UserDetailsDialog showUserDetailsDialog={showUserDetailsDialog} setShowUserDetailsDialog={setShowUserDetailsDialog} />
          <ConfirmDeleteUserDialog
            showConfirmDeleteUserDialog={showConfirmDeleteUserDialog}
            setShowConfirmDeleteUserDialog={setShowConfirmDeleteUserDialog}
          />
        </Menu>
      );
    },
  },
];

export default function ManageUsersTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { isPending: isGettingAllUsers, data: users } = useGetAllUsers();

  const table = useReactTable({
    data: users?.data ?? [],
    columns: userTableColumsn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isGettingAllUsers) return <PageSpinner />;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={userTableColumsn.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
