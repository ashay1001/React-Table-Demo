import React, { useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { FilterProps } from "react-table";


export function handleFilterFn(rows: any[], ids: any[], filterValue: any[]) {

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
                return String(rowValue).toLowerCase() === (String(value).toLowerCase());
            });
        });
        return rows;
    }
    else
        return rows;
}


export const DefaultCustomFilter = ({ column: { setFilter }, }: FilterProps<any>) => {

    const [filterType, setFilterType] = useState('contains');
    const [valueToFilter, setValueToFilter] = useState('');

    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

    const { styles, attributes } = usePopper(referenceElement, popperElement);

    const [popperVisibility, setPopperVisibility] = useState<boolean>(false);

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
        <span className="filter_container">
            <button className="filter_btn" ref={setReferenceElement}>
                <i className="bi bi-filter"></i>
            </button>
            {createPortal(
                <div id="tooltip" className="portal_container" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                    <select value={filterType} onChange={handleChange}>
                        <option value="contains">Contains</option>
                        <option value="starts_with">Starts With</option>
                        <option value="ends_with">Ends With</option>
                        <option value="exact">Exact</option>
                    </select>
                    <input type="text" value={valueToFilter || ''} onChange={handleValueChange} />
                    <div className="popup_btn_container">
                        <button className="popup_btn apply_btn" onClick={handleSubmit}>Apply</button>
                        <button className="popup_btn clear_button" onClick={handleClear}>Clear</button>
                    </div>
                    <div id="arrow" data-popper-arrow></div>
                </div>,
                document.body
            )}
        </span>

    );
}