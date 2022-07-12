import getUserLocale from 'get-user-locale';

const userLocale = getUserLocale();

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


export interface Data {
  name: string,
  cargo_capacity: string,
  consumables: string,
  cost_in_credits: string,
  created: string,
  crew: string,
  edited: string,
  length: string,
  manufacturer: string,
  max_atmosphering_speed: string,
  model: string,
  passengers: string,
  pilots: string[],
  films: string[],
  url: string,
  hyperdrive_rating: string,
  MGLT: string,
  starship_class: string,
}