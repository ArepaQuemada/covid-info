import dateFormat from 'dateformat';

export default function useParseDate() {

    const parseToday = (date) => dateFormat(date, "yyyy-mm-dd").concat('T00:00:00Z');

    const parsefromDate = (date) => {
        const fromDate = date.getDate() -31;
        return dateFormat(new Date(date.setDate(fromDate)), "yyyy-mm-dd").concat('T00:00:00Z');
    }

    return {
        today: parseToday(new Date()),
        fromDate: parsefromDate(new Date())
    }
}