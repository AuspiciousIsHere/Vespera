import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheck, CircleX, EllipsisVertical, Eye, Trash, UserRound } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, MenuGroup, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ConfirmDeleteUserDialog from "./ConfirmDeleteUserDialog";
import { useGetAllUsers } from "./hooks/useGetAllUsers";
import { useDeleteUsers } from "./hooks/useDeleteUsers";
import UserDetailsDialog from "./UserDetailsDialog";
import TablePagination from "@/ui/TablePagination";
import PageSpinner from "@/ui/PageSpinner";

import { USER_IMAGE_URL } from "@/constant/constants";
import { useDebounce } from "@/hooks/useDebounce";
import type { User } from "@/types/user";

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
    id: "Index",
    cell: ({ row, table }) => table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) + 1 || 0 + 1,
  },
  {
    accessorKey: "picture",
    header: "Picture",
    cell: ({ row }) => {
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
    accessorKey: "designs",
    header: "Designs",
    cell: ({ row }) => {
      const designs: string[] = row.getValue("designs");
      return designs.length;
    },
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (row.getValue("active") ? <CircleCheck className="text-emerald-500" /> : <CircleX className="text-red-500" />),
  },
  {
    accessorKey: "followers",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Followers
        <ArrowUpDown className={`ml-2 h-4 w-4 transition-transform ${column.getIsSorted() === "asc" ? "rotate-180" : ""}`} />
      </Button>
    ),
    cell: ({ row }) => {
      const followers: string[] = row.getValue("followers") || [];
      return followers.length;
    },
    sortingFn: (rowA, rowB, columndID) => {
      const lenA = (rowA.getValue(columndID) as string[])?.length ?? 0;
      const lenB = (rowB.getValue(columndID) as string[])?.length ?? 0;
      return lenA - lenB;
    },
  },
  {
    accessorKey: "following",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Following
        <ArrowUpDown className={`ml-2 h-4 w-4 transition-transform ${column.getIsSorted() === "asc" ? "rotate-180" : ""}`} />
      </Button>
    ),
    cell: ({ row }) => {
      const followers: string[] = row.getValue("following");
      return followers.length;
    },
    sortingFn: (rowA, rowB, columndID) => {
      const lenA = (rowA.getValue(columndID) as string[])?.length ?? 0;
      const lenB = (rowB.getValue(columndID) as string[])?.length ?? 0;
      return lenA - lenB;
    },
  },
  {
    id: "mneu",
    cell: ({ row }) => {
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
                {row.getValue("active") ? "Deactivate" : "Active"}
              </MenuItem>

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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortBy, setSortBy] = useState<SortingState>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 1000);

  const { isPending: isDeletingUsers, mutate: deleteUsers } = useDeleteUsers();

  const getAllUsersFilters = {
    page: pageIndex + 1,
    pageSize,
    search: debounceSearchTerm,
    active: activeFilter,
    sort: sortBy[0] ? `${sortBy[0]?.desc ? "-" : ""}${sortBy[0]?.id}` : "-createdAt",
  };

  const { isPending: isGettingAllUsers, data: usersData } = useGetAllUsers(getAllUsersFilters);

  const table = useReactTable({
    data: usersData?.data ?? [],
    columns: userTableColumsn,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSortBy,
    manualPagination: true,
    rowCount: usersData?.total ?? 0,
    state: {
      sorting: sortBy,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
  });

  const activeUsersOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Deactive", value: "deactive" },
  ];

  if (isGettingAllUsers) return <PageSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-2xl">{usersData?.total} Users</h2>

        <div className="flex items-center gap-3">
          {/* Delete selected users */}
          <AlertDialog>
            <AlertDialogTrigger
              disabled={!(table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"))}
              render={<Button variant="outline" className="text-red-400" title="Delete Selected Designs" />}
            >
              <Trash />
            </AlertDialogTrigger>

            <AlertDialogPopup>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Selected Users?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose render={<Button variant="ghost">Cancel</Button>} />
                <AlertDialogClose
                  render={
                    <Button
                      variant="destructive"
                      onClick={() =>
                        deleteUsers(
                          table.getSelectedRowModel().rows.map((row) => row.original._id),
                          { onSuccess: () => table.toggleAllPageRowsSelected(false) }
                        )
                      }
                      disabled={isDeletingUsers}
                    />
                  }
                >
                  {isDeletingUsers && <Spinner />}
                  Delete Users
                </AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialog>

          {/* Global search input */}
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search email, username or fullname" />

          {/* user state filter */}
          <Select
            items={activeUsersOptions}
            aria-label="Select User State"
            value={activeFilter}
            // @ts-ignore
            onValueChange={(item) => setActiveFilter(item)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {activeUsersOptions.map((item) => (
                <SelectItem key={String(item.value)} value={item.value ?? ""}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </div>

      <div className="rounded-md border bg-background">
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

      <TablePagination totalCount={usersData?.total || 0} pageSize={pageSize} pageIndex={pageIndex} setPagination={setPagination} />
    </div>
  );
}
