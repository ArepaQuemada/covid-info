import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(url, setLoading) {
    const [ data, setData ] = useState();

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            const fetchData = async () => {
                try {
                    setLoading(true)
                    const data = await axios.get(url);
                    setData(data.data);
                } catch (err) {
                    console.log(err);
                    setData(undefined);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }
        return () => {
            unmounted = true;
        }
    }, [ url, setLoading ]);
    return data;
}