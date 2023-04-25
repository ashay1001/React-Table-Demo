import React, { useMemo } from 'react'
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from 'react-table';
import '../styles/TableComponent.css'
import GlobalFilter from './GlobalFilter';
import { DefaultCustomFilter, handleFilterFn } from "./DefaultCustomFilter";
import { Portal } from '../portal';

type Tableprops = {
    data: any[];
    columns: any[];
    table_heading: string;
}

export default function TableComponent(props: Tableprops) {
    const heading = props.table_heading;
    const data = useMemo(() => props.data, [props.data]);
    const columns = useMemo(() => props.columns, [props.columns]);
    const defaultColumn = useMemo(() => ({ Filter: DefaultCustomFilter, filter: handleFilterFn }), []);


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageCount,
        gotoPage,
        state,
        setPageSize,
        setGlobalFilter,
        prepareRow
    } = useTable({ columns, data, defaultColumn, /*filterTypes: { date: dateFilterFn },*/ initialState: { pageIndex: 0, pageSize: 15 } }, useFilters, useGlobalFilter, useSortBy, usePagination);

    const { pageIndex, globalFilter } = state;

    return (
        <>
            <div className="title_container">
                <div className="heading">{heading}</div>
                <GlobalFilter filterValue={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className='table_container'>
                <table className='table_wrapper' {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((col) => (
                                        <th>
                                            <span {...col.getHeaderProps(col.getSortByToggleProps())}>
                                                {col.render('Header')}
                                                <span>
                                                    {col.isSorted ? (col.isSortedDesc ? <i className='bi bi-caret-down-fill'></i> : <i className='bi bi-caret-up-fill'></i>) : ''}
                                                </span>
                                            </span>
                                            <span>
                                                {col.canFilter ? col.render('Filter') : null}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps}>
                        {
                            page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell) => {
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='pagination_container'>
                <div className='pageSize-container'>
                    <select className="page-size-options" onChange={e => setPageSize(Number(e.target.value))}>
                        <option value="15">15/page</option>
                        <option value="30">30/page</option>
                        <option value="50">50/page</option>
                        <option value="100">100/page</option>
                        <option value="200">200/page</option>
                        <option value="500">500/page</option>
                    </select>
                </div>
                <button className='nav-btn' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <i className="bi bi-chevron-double-left"></i>
                </button>
                <button className='nav-btn' onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <i className="bi bi-chevron-left"></i>
                </button>
                <button className='pageNo-btn'>
                    {pageIndex + 1}
                </button>
                <button className='nav-btn' onClick={() => nextPage()} disabled={!canNextPage}>
                    <i className="bi bi-chevron-right"></i>
                </button>
                <button className='nav-btn' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <i className="bi bi-chevron-double-right"></i>
                </button>
            </div>
        </>
    )
}
