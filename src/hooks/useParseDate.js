import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';

export default function useParseDate() {
    const [ dates, setDates ] = useState();
    
    const parseToday = (date) => dateFormat(date, "yyyy-mm-dd").concat('T00:00:00Z');

    const parseLastWeek = (date) => {
        const lastWeek = date.getDate() -7;
        return dateFormat(new Date(date.setDate(lastWeek)), "yyyy-mm-dd").concat('T00:00:00Z');
    }

    useEffect(() => {
        const current = new Date();

        setDates({
            today: parseToday(current),
            lastWeek: parseLastWeek(current)
        });

    }, []);
    return dates ? dates : {};
}