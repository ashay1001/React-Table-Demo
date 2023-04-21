import React from "react";

type filterProps = {
    column: any;
}

export const ColumnFilter = (props: filterProps) => {
    const {filterValue, setFilter} = props.column;

    return (
        <span>
            <input type="text" value={filterValue || ''} onChange={(e) => setFilter(e.target.value)}/>
        </span>
    );
}