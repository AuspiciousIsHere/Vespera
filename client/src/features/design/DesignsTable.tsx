import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronDownIcon, Columns3Icon, EllipsisVertical, Eye, RefreshCcwIcon, SearchIcon, Trash } from "lucide-react";
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import { Link } from "react-router";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Menu, MenuGroup, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu";
import ConfirmDeleteDesignDialog from "./ConfirmDeleteDesignDialog";
import type { Design, DesignList } from "@/types/design";
import { DESIGN_IMAGE_URL } from "@/constant/constants";
import { Input } from "@/components/ui/input";
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
import { Spinner } from "@/components/ui/spinner";
import { useDeleteUserDesigns } from "./hooks/useDeleteUserDesigns";
import { useAuthStore } from "@/store/authStore";

const columns: ColumnDef<Design>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "images",
    header: "Preview",
    cell: ({ row }) => {
      const images: string[] = row.getValue("images");

      return (
        <div className="capitalize w-10">
          <img src={`${DESIGN_IMAGE_URL}/${images[0]}`} alt={images[0]} />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "colors",
    header: "Colors",
    cell: ({ row }) => {
      const colors: string[] = row.getValue("colors");
      return <div>{colors.length}</div>;
    },
  },
  {
    accessorKey: "gradients",
    header: () => <div>Gradinets</div>,
    cell: ({ row }) => {
      // const amount = parseFloat(row.getValue("amount"));

      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount);

      const gradients: string[] = row.getValue("gradients");

      return <div className="font-medium">{gradients.length}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => <div>{row.getValue("rating")}</div>,
  },
  {
    accessorKey: "ratingCount",
    header: "Rating Count",
    cell: ({ row }) => <div>{row.getValue("ratingCount")}</div>,
  },
  {
    id: "menu",
    cell: ({ row }) => {
      const [showConfirmDeleteDesign, setShowConfirmDeleteDesign] = useState(false);
      // const { mutate: deleteDesign, isPending: isDeletingDesign } = useDeleteDesign(row.original._id);

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

interface DesignsContainerMapPropTypes {
  designs: DesignList | undefined;
}

export default function DesignsTable({ designs }: DesignsContainerMapPropTypes) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const user = useAuthStore((state) => state.user);
  const { mutate: deleteDesigns, isPending: isDeletingDesigns } = useDeleteUserDesigns(user?._id || "");

  const defaultDesigns: DesignList = {
    status: "",
    total: 0,
    data: [],
  };

  const table = useReactTable({
    data: designs?.data || defaultDesigns.data,
    columns,
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

  return (
    <div className="w-full">
      <div className="py-4 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full max-w-3xs justify-between">
              <span className="flex items-center gap-2">
                <Columns3Icon />
                Columns
              </span>{" "}
              <ChevronDownIcon className="ml-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                placeholder="Search"
                onKeyDown={(e) => e.stopPropagation()}
              />
              <SearchIcon className="absolute inset-y-0 left-2 my-auto size-4" />
            </div>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                if (searchQuery && !column.id.toLowerCase().includes(searchQuery.toLowerCase())) {
                  return null;
                }

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                table.resetColumnVisibility();
                setSearchQuery("");
              }}
            >
              <RefreshCcwIcon /> Reset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog>
          <AlertDialogTrigger
            disabled={!(table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"))}
            render={<Button variant="outline" className="text-red-400" title="Delete Selected Designs" />}
          >
            <Trash />
          </AlertDialogTrigger>

          <AlertDialogPopup>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Selected Designs?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose render={<Button variant="ghost">Cancel</Button>} />
              <AlertDialogClose
                render={
                  <Button
                    variant="destructive"
                    onClick={() => deleteDesigns(table.getSelectedRowModel().rows.map((row) => row.original._id))}
                    disabled={isDeletingDesigns}
                  />
                }
              >
                {isDeletingDesigns && <Spinner />}
                Delete Designs
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialog>
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-sm">Data table column visibility</p>
    </div>
  );
}
