'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type CategoryColumn = {
	id: string;
	label: string;
	billboardLabel: string;
	createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: 'label',
		header: 'Name',
	},
	{
		accessorKey: 'billboard',
		header: 'Billboard',
		cell: ({ row }) => row.original.billboardLabel,
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
