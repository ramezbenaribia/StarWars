export interface Column {
    id: 'name' | 'manufacturer' | 'cost_in_credits' | 'created';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: 'Date' | 'number'
}

export const columns: readonly Column[] = [
    {
        id: 'name',
        label: 'Name',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'manufacturer',
        label: 'Manufacturer',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'cost_in_credits',
        label: 'Cost in Credits',
        minWidth: 170,
        align: 'center',
        format: 'number'


    },
    {
        id: 'created',
        label: 'Created',
        minWidth: 170,
        align: 'center',
        format: 'Date'
    },
];
