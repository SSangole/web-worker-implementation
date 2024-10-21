export default async function fetchProducts(size) {
    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${size}&skip=${size}`);
        
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json(); // Parse the JSON data
        console.log('fetchProducts ~ data->', data);
        return data; // Return the parsed data
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Optionally rethrow the error for further handling
    }
}