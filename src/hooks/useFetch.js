import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(url) {
    console.log(url)
    const [ data, setData ] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(url);
            setData(data.data);
        }
        fetchData();
    }, [ url ]);
    return data;
}