import React, { useState } from "react";
import { FilterProps } from "react-table";


function handleFilterFn(rows: any[], ids: any[], filterValue: any[]) {

    const [filterType, value] = filterValue;
    console.log("From handleFilterFn: ", filterType, value);

    if (filterType === 'contains') {
        rows = rows.filter((row) => {
            return ids.some((id) => {
                const rowValue = row.values[id];
                return String(rowValue).toLowerCase().includes(String(value).toLowerCase());
            });
        });
        return rows;
    }
    else if (filterType === 'starts_with') {
        rows = rows.filter((row) => {
            return ids.some((id) => {
                const rowValue = row.values[id];
                return String(rowValue).toLowerCase().startsWith(String(value).toLowerCase());
            });
        });
        return rows;
    }
    else if (filterType === 'ends_with') {
        rows = rows.filter((row) => {
            return ids.some((id) => {
                const rowValue = row.values[id];
                return String(rowValue).toLowerCase().endsWith(String(value).toLowerCase());
            });
        });
        return rows;
    }
    else if (filterType === 'exact') {
        rows = rows.filter((row) => {
            return ids.some((id) => {
                const rowValue = row.values[id];
                return String(rowValue).toLowerCase() === (String(filterValue).toLowerCase());
            });
        });
        return rows;
    }
    else
        return rows;
}


function contains(rows: any[], ids: any[], filterValue: any) {
    rows = rows.filter((row) => {
        return ids.some((id) => {
            const rowValue = row.values[id];
            return String(rowValue)
                .toLowerCase()
                .includes(String(filterValue).toLowerCase());
        });
    });
    return rows;
}

function startsWith(rows: any[], ids: any[], filterValue: any) {
    rows = rows.filter((row) => {
        return ids.some((id) => {
            const rowValue = row.values[id];
            return String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase());
        });
    });
    return rows;
}

function endsWith(rows: any[], ids: any[], filterValue: any) {
    rows = rows.filter((row) => {
        return ids.some((id) => {
            const rowValue = row.values[id];
            return String(rowValue)
                .toLowerCase()
                .endsWith(String(filterValue).toLowerCase());
        });
    });
    return rows;
}

function equals(rows: any[], ids: any[], filterValue: any) {
    rows = rows.filter((row) => {
        return ids.some((id) => {
            const rowValue = row.values[id];
            return String(rowValue).toLowerCase() === String(filterValue).toLowerCase();
        });
    });
    return rows;
}

export { handleFilterFn, contains, startsWith, endsWith, equals };

// type filterProps = {
//     column: any;
// }


export const ColumnFilter = ({ column: { filterValue, setFilter }, }: FilterProps<any>) => {
    //const { filterValue, setFilter, filter, setFilterType } = props.column;
    const [filterType, setFilterType] = useState('contains');
    const [valueToFilter, setValueToFilter] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(e.target.value);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueToFilter(e.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log("From handleSubmit: ", filterType, valueToFilter);
        setFilter([filterType, valueToFilter]);
    };

    const handleClear = () => {
        setValueToFilter('');
        setFilterType('contains');
        setFilter(['', '']);
    };

    return (
        <div>
            <select value={filterType} onChange={handleChange}>
                <option value="contains">Contains</option>
                <option value="starts_with">Starts With</option>
                <option value="ends_with">Ends With</option>
                <option value="exact">Exact</option>
            </select>
            {/* <input type="text" value={filterValue || ''} onChange={(e) => setFilter(e.target.value || undefined)} /> */}
            <input type="text" value={valueToFilter || ''} onChange={handleValueChange} />
            <button onClick={handleSubmit}>Apply</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    );
}