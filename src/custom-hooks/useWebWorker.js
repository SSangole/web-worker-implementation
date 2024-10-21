import { useEffect, useState } from "react";

const useWebWorker = (inputData) => {
    const [ result, setResult ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    console.log('useWebWorker ~ inputData->', inputData);

    useEffect(() => {
        setLoading(true);
        setError(null);
        try {   
        const worker = new Worker(
            new URL("../workers/worker.js", import.meta.url),
            { type: "module" }
        );
         worker.postMessage({
             init: true,
             patchSize: inputData
         });
 
         worker.onmessage = async function (e) {
             const data = await e.data.products;
             setResult(data);
             setLoading(false);
         };
 
         worker.onerror = (e) => {
             setError(e.message);
             setLoading(false);
         };

         return (() => {
             worker.terminate();
             URL.revokeObjectURL(worker);
         });
       } catch (error) {
         setError(error);
         setLoading(false);
        
       }

    }, [inputData]);

    return { result, error, loading };
};

export default useWebWorker;