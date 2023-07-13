import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';
import { DataTableCellUnknow } from './data-table-cell-unknow';

interface ColumnsType {
	name: string;
	gender: string;
	aliases: string[];
	url: string;
	born: string;
	died: string;
}

export const columns: ColumnDef<ColumnsType>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => {
			const { name } = row.original;

			if (!name) return <DataTableCellUnknow />;

			return name;
		}
	},
	{
		accessorKey: 'gender',
		header: 'Gender'
	},
	{
		accessorKey: 'aliases',
		header: 'Aliase',
		cell: ({ row }) => {
			const { aliases } = row.original;

			if (!aliases[0]) return <DataTableCellUnknow />;

			return <span className='w-[700px]'>{aliases[0]}</span>;
		}
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const { died } = row.original;

			if (!died) {
				return <span>Alive</span>;
			}

			return <span>Dead</span>;
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />
	}
];
