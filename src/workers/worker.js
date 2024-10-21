import fetchProducts from "../utils/index";

onmessage = function (message) {
    const data = message.data;
    console.log('message->', message);
    if (data.init) {
    setTimeout(async () => {
    const response = await fetchProducts(data.patchSize);
    console.log('worker ~ response->', response);
    postMessage(response);
    }, 2000);
    } else {
    return;
    }
};