import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(url, setLoading) {
    const [ data, setData ] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await axios.get(url);
                setData(data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [ url, setLoading ]);
    return data;
}