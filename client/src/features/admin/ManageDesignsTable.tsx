import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheck, CircleX, EllipsisVertical, Eye, Trash, UserRound } from "lucide-react";
import { Link } from "react-router";
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

import TablePagination from "@/ui/TablePagination";
import PageSpinner from "@/ui/PageSpinner";

import { useGetAllDesigns } from "./hooks/useGetAllDesigns";
import { DESIGN_IMAGE_URL } from "@/constant/constants";
import { useDebounce } from "@/hooks/useDebounce";
import type { Design } from "@/types/design";
import type { User } from "@/types/user";
import ConfirmDeleteDesignDialog from "../design/ConfirmDeleteDesignDialog";
import { useDeleteDesigns } from "./hooks/useDeleteDesigns";

const designTableColumsn: ColumnDef<Design>[] = [
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
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const designPictures: string[] = row.getValue("images");
      const designPicture = designPictures[0];

      return (
        <div className="w-14 bg-secondary flex items-center justify-center">
          {designPicture && designPicture !== "default-user.png" ? (
            <img src={`${DESIGN_IMAGE_URL}/${designPicture}`} alt={row.getValue("name")} className="" />
          ) : (
            <UserRound className="size-7" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      const user: User = row.getValue("owner");
      return `${user.firstName} ${user.lastName}`;
    },
  },
  {
    accessorKey: "gradients",
    header: "Designs",
    cell: ({ row }) => {
      const gradients: string[] = row.getValue("gradients");
      return gradients.length;
    },
  },
  {
    accessorKey: "colors",
    header: "Colors",
    cell: ({ row }) => {
      const colors: string[] = row.getValue("colors");
      return colors.length;
    },
  },
  {
    accessorKey: "likesCount",
    header: "Likes",
    cell: ({ row }) => row.getValue("likesCount"),
  },
  {
    accessorKey: "ratingCount",
    header: "Rated",
    cell: ({ row }) => row.getValue("ratingCount"),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => row.getValue("rating"),
  },
  {
    id: "menu",
    cell: ({ row }) => {
      const [showConfirmDeleteDesign, setShowConfirmDeleteDesign] = useState(false);

      return (
        <Menu>
          <MenuTrigger>
            <EllipsisVertical />
          </MenuTrigger>

          <MenuPopup>
            <MenuGroup>
              <MenuItem>
                <Link to={`/design/${row.original._id}`} className="flex items-center gap-2">
                  <Eye />
                  Details
                </Link>
              </MenuItem>

              <MenuItem onClick={() => setShowConfirmDeleteDesign(true)} className="text-red-400">
                <Trash className="size-4" />
                Delete
              </MenuItem>
            </MenuGroup>
          </MenuPopup>

          <ConfirmDeleteDesignDialog
            designID={row.original._id}
            showConfirmDeleteDesign={showConfirmDeleteDesign}
            setShowConfirmDeleteDesign={setShowConfirmDeleteDesign}
          />
        </Menu>
      );
    },
  },
];

export default function ManageDesignsTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortBy, setSortBy] = useState<SortingState>([]);
  const [searchDesignTerm, setSearchDesignTerm] = useState("");
  const debounceSearchDesignTerm = useDebounce(searchDesignTerm, 1000);

  const { isPending: isDeletingDesigns, mutate: deleteDesigns } = useDeleteDesigns();

  const designsFilters = {
    page: pageIndex + 1,
    pageSize,
    search: debounceSearchDesignTerm,
    sort: sortBy[0] ? `${sortBy[0]?.desc ? "-" : ""}${sortBy[0]?.id}` : "-createdAt",
  };

  const { isPending: isGettingAllDesigns, data: designsData } = useGetAllDesigns(designsFilters);

  const table = useReactTable({
    data: designsData?.data ?? [],
    columns: designTableColumsn,
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
    rowCount: designsData?.total ?? 0,
    state: {
      sorting: sortBy,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
  });

  if (isGettingAllDesigns) return <PageSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-2xl">{designsData?.total} Users</h2>

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
                        deleteDesigns(
                          table.getSelectedRowModel().rows.map((row) => row.original._id),
                          { onSuccess: () => table.toggleAllPageRowsSelected(false) }
                        )
                      }
                      disabled={isDeletingDesigns}
                    />
                  }
                >
                  {isDeletingDesigns && <Spinner />}
                  Delete Users
                </AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialog>

          {/* Global search input */}
          <Input value={searchDesignTerm} onChange={(e) => setSearchDesignTerm(e.target.value)} placeholder="Search design name" />
        </div>
      </div>

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
                <TableCell colSpan={designTableColumsn.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination totalCount={designsData?.total || 0} pageSize={pageSize} pageIndex={pageIndex} setPagination={setPagination} />
    </div>
  );
}
