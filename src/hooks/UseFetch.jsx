import React, { useEffect,useState } from 'react'
import {fetchDataFromApi} from '../utils/api'

const Usefetch=(url)=>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading("loading...");
        setData(null);
        setError(null);

        fetchDataFromApi(url)
        .then((res)=>{
            setLoading(false);
            setData(res);
        })
        .catch((e)=>{
            setLoading(false);
            setError(e)
        })
    },[url])

    return { data, loading, error };
}

export default Usefetch;
