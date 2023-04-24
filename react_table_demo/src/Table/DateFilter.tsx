import { useState } from "react";
import { FilterProps } from "react-table";

export function dateFilterFn(rows: any[], id: any[], filterValue: any[]) {
    console.log("filterValue From dateFilter function: ", filterValue);
    //return rows;
    const filterDate = new Date(filterValue[1]).getTime();
    console.log("filterDate From dateFilter function: ", filterDate);
    return rows.filter((row) => {


        const rowDate = new Date(row.values[id[0]]).getTime();

        if (filterValue[0] === '' || filterValue[1] === '') {
            return true; // no filter value, return all rows
        } else if (filterValue[0] === '<') {
            return rowDate < filterDate; // filter for dates less than entered date
        } else if (filterValue[0] === '>') {
            return rowDate > filterDate; // filter for dates greater than entered date
        } else {
            return false; // invalid filter value, don't filter
        }
    });
}




export function DateFilter({ column: { filterValue, setFilter }, }: FilterProps<any>) {
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log("From handleSubmit: ",value, date);
        setFilter([value, date]);
    };

    const handleClear = () => {
        setValue('');
        setDate('');
        setFilter(['', '']);
    };

    return (
        <div>
            <select value={value} onChange={handleChange}>
                <option value="">Select filter type</option>
                <option value="<">Less than</option>
                <option value=">">Greater than</option>
            </select>
            <input type="date" value={date} onChange={handleDateChange} />
            <button onClick={handleSubmit}>Apply</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    );
}