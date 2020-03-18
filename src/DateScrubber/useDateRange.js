import moment from 'moment';
import { useState, useEffect } from 'react';

export function useDateRange (from, to) {
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    const range = [];
    const f = moment(from);
    const t = moment(to);
    let cursor = f;

    while (cursor.isSameOrBefore(t)) {
      range.push(cursor.clone().format('M/D/YY'));
      cursor.add(1, 'day');
    }

    setDateRange(range);
  }, [from, to]);

  return dateRange;
}
