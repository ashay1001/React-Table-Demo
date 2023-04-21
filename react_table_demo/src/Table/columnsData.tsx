import { format } from "date-fns";
import DatePicker from "react-datepicker";

export const columnsData = [
    {
        Header: 'Name',
        accessor: (row: { name: { title: any; first: any; last: any }; }) => row.name.title + ". " + row.name.first + " " + row.name.last
    },
    {
        Header: 'Gender',
        accessor: 'gender'
    },
    {
        Header: 'Date of Birth',
        accessor: 'dob.date',
        Cell: ({ value }: { value: string }) => {
            return <span>{format(new Date(value), 'MMM dd, yyyy hh:mm a')}</span>;
        }
    },
    {
        Header: 'Country',
        accessor: 'location.country'
    },
]