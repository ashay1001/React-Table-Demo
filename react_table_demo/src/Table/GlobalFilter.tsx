import React from 'react'

type filterProps = {
  filterValue: any;
    setFilter: any;
}

const GlobalFilter = (props: filterProps) => {
  return (
    <div>
        <span>
            search:{' '}
            <input type="text" value={props.filterValue || ''} onChange={(e) => props.setFilter(e.target.value)}/>
        </span>
    </div>
  )
}

export default GlobalFilter