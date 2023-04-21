import { format, parse } from 'date-fns';

const DateRangeFilter = (rows: any[], columnIds: string[], filterValue: { startDate: Date, endDate: Date }) => {
  return rows.filter(row => {
    return columnIds.some(columnId => {
      const date = parse(row.values[columnId], 'yyyy-MM-dd', new Date());

      if (!date) {
        return false;
      }

      const startDate = filterValue.startDate ? format(filterValue.startDate, 'yyyy-MM-dd') : null;
      const endDate = filterValue.endDate ? format(filterValue.endDate, 'yyyy-MM-dd') : null;

      if (startDate && endDate) {
        return date >= parse(startDate, 'yyyy-MM-dd', new Date()) && date <= parse(endDate, 'yyyy-MM-dd', new Date());
      } else if (startDate) {
        return date >= parse(startDate, 'yyyy-MM-dd', new Date());
      } else if (endDate) {
        return date <= parse(endDate, 'yyyy-MM-dd', new Date());
      }

      return true;
    });
  });
};

export default DateRangeFilter
