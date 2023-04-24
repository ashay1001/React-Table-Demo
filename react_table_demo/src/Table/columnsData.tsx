import { format } from "date-fns";
import { SelectColumnFilter } from "./SelectColumnFilter";
import {DateFilter, dateFilterFn} from "./DateFilter";


export const columnsData = [
    {
        Header: 'Name',
        accessor: (row: { name: { title: any; first: any; last: any }; }) => row.name.title + ". " + row.name.first + " " + row.name.last,
        disableFilters: true,
        //disableGlobalFilter: true,
    },
    {
        Header: 'Gender',
        accessor: 'gender',
        Filter: SelectColumnFilter,
        filter: 'equals' // by default, filter: 'text', but in our case we don't want to filter options like text, we want to find exact match of selected option.
    },
    {
        id: 'dateOfBirth',
        Header: 'Date of Birth',
        accessor: 'dob.date',
        Cell: ({ value }: { value: string }) => {
            return <span>{format(new Date(value), 'MMM dd, yyyy hh:mm a')}</span>;
        },
        Filter: DateFilter,
        filter: dateFilterFn
    },
    {
        Header: 'Country',
        accessor: 'location.country'
    },
]