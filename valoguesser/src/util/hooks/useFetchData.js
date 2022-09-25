import { useState, useEffect } from "react";
import axios from 'axios';

export const useFetchData = (url) => {
    // set loading,data and error variable
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // fetch data using axios
    const getData = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const result = await axios.get(url);
            setData(result.data);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
        }
    }
    useEffect(() => {
        // call fetch data function
        getData();
    }, [url]);

    return { isLoading, data, error };
}