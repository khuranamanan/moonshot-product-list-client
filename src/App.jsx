import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await axios.post(
          "https://moonshot-product-list-backend.vercel.app/get-token"
        );
        const fetchedToken = tokenResponse.data.token;

        const productsResponse = await axios.post(
          "https://moonshot-product-list-backend.vercel.app/get-products",
          {
            token: fetchedToken,
          }
        );
        const fetchedProducts = productsResponse.data.products.data.electricity;

        setProducts(fetchedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">
                {product.plan_name}
              </h2>
              <p className="text-sm">Energy Type: {product.energy_type}</p>
              <p className="text-sm">
                Contract Length: {product.contract_length}
              </p>
              <p className="text-sm">Provider: {product.provider_name}</p>
              <p className="text-sm">
                Expected Annually Bill Amount:{" "}
                {product.expected_annually_bill_amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
