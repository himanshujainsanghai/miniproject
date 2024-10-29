import { useEffect, useState } from "react";
import axios from "axios";

function CountComponent() {
  const [count, setCount] = useState(0);

  // Fetch count from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/count")
      .then((response) => {
        setCount(response.data.countValue);
      })
      .catch((error) => {
        console.error("There was an error fetching the count!", error);
      });
  }, []);

  const incrementCount = () => {
    const newCount = count + 1;
    axios
      .post("http://localhost:5000/api/count/update", { newCount })
      .then((response) => {
        setCount(response.data.countValue);
      })
      .catch((error) => {
        console.error("Error updating the count!", error);
      });
  };
  const decrementCount = () => {
    axios
      .post("http://localhost:5000/api/decrement-count")
      .then((response) => {
        setCount(response.data.countValue); // Update count value
      })
      .catch((error) => {
        setError("Error decrementing the count! " + error.message);
      });
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={incrementCount}>Increment Count</button>
      <button onClick={decrementCount}>Decrement Count</button>
    </div>
  );
}

export default CountComponent;
