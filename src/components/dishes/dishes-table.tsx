import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import type { Dish } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Trash2, Copy } from 'lucide-react';

const columnHelper = createColumnHelper<Dish>();

interface DishesTableProps {
  dishes: Dish[];
  onDelete: (id: string) => void;
  onDeleteSelected: (ids: string[]) => void;
  onDuplicate: (id: string) => void;
  currentPlan: string;
}

export function DishesTable({ dishes, onDelete, onDeleteSelected, onDuplicate, currentPlan }: DishesTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const planLimits = {
    'OMQ Free': 5,
    'OMQ Plus': 25,
    'OMQ Premium': 150,
  };

  const isAtLimit = dishes.length >= planLimits[currentPlan as keyof typeof planLimits];

  const columns = [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="rounded border-gray-300"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="rounded border-gray-300"
        />
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('price', {
      header: 'Price',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('quantity', {
      header: 'Quantity',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            onClick={() => onDuplicate(row.original.id)}
            disabled={isAtLimit}
            title={isAtLimit ? `Upgrade your plan to add more dishes` : 'Duplicate dish'}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: dishes,
    columns,
    state: {
      sorting,
      rowSelection: {},
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  return (
    <div className="space-y-4">
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-2">
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              onDeleteSelected(selectedRows);
              setSelectedRows([]);
            }}
          >
            Delete Selected ({selectedRows.length})
          </Button>
        </div>
      )}
      
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}