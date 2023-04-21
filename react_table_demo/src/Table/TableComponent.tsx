import React, { useMemo } from 'react'
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from 'react-table';
import '../styles/TableComponent.css'
import GlobalFilter from './GlobalFilter';

type Tableprops = {
    data: any[];
    columns: any[];
}

export default function TableComponent(props: Tableprops) {
    const data = useMemo(() => props.data, [props.data]);
    const columns = useMemo(() => props.columns, [props.columns]);

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
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 15 } }, useGlobalFilter, useSortBy, usePagination );

    const { pageIndex, globalFilter } = state;

    return (
        <>
            <div className='table_container'>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <table className='table_wrapper' {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((col) => (
                                        <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                                            {col.render('Header')}
                                            <span>
                                                {col.isSorted ? (col.isSortedDesc ? <i className='bi bi-caret-down-fill'></i> : <i className='bi bi-caret-up-fill'></i>) : ''}
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
