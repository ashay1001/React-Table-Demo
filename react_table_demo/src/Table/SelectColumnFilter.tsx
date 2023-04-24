import React from "react";

type filterProps = {
    column: any;
}

export const SelectColumnFilter = (props: filterProps) => {
    
    //const {filterValue, setFilter, preFilteredRows, id } = props.column;
    const {setFilter} = props.column;
    const options = ["male", "female"];

    return (
        <select
            id="custom-select"
            //value={filterValue}
            onChange={(e: { target: { value: any; }; }) => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}