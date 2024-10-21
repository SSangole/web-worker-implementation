import { useState, useEffect } from "react";
// import useWebWorker from "./custom-hooks/useWebWorker";

function App() {
//initialize web worker
const worker = new Worker(
  new URL("./workers/worker.js", import.meta.url), 
  { type: "module" }
);

const [initWorker, setInitWorker] = useState(false);
const [products, setProducts] = useState([]);
// const { result, error, loading } = useWebWorker(20); // Uncomment this line to use the custom hook which uses web worker

// Calls the worker
useEffect(() => {
  if (!initWorker) return;

  const setupWorker = () => {
    worker.postMessage({
      init: true,
      patchSize: 10,
    });

    worker.onmessage = async (e) => {
      const data = await e.data.products;
      setProducts(data);
    };
  };

  setupWorker();

  return () => {
    worker.terminate();
  };
}, [initWorker]);


const handleClick = () => {
setInitWorker(!initWorker);
};

return (
  <div>
  <h1>Web worker example</h1>
  <div className='products'>
  <h2>Products: {products.map(
    (item) => {
      return <span>{item.title}</span>;
    }
  )}</h2>
  <button onClick={handleClick}>{initWorker ? "Stop" : "Start"}</button>
  <button onClick={() => console.log("consoling")}>Print</button>
  <button onClick={() => setProducts([])}>CLEAR</button>
  </div>

  {/* <div className='products'>
  <h2>Products: {loading ? <span>Loading...</span> : result?.map(
    (item) => {
      return <span>{item.title}</span>;
    }
  )}</h2>
  <button onClick={() => setInitWorker(!initWorker)}>{initWorker ? "Stop" : "Start"}</button>
  <button onClick={() => console.log("consoling 2")}>Print</button>
  <button onClick={() => setProducts([])}>CLEAR</button>
  </div> */}
  </div>
);
}
export default App;