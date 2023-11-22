import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isFetchPending, setFetchPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pizza.kando-dev.eu/Pizza');
        const data = await response.json();
        const processedData = data.map((pizza) => ({
          id: pizza.id,
          name: pizza.name,
          isGlutenFree: pizza.isGlutenFree === 1 ? 'Igen' : 'Nem',
          imgUrl: pizza.kepURL,
        }));
        setPizzas(processedData);
      } finally {
        setFetchPending(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <h1 className='p-2 text-center'>Pizzák</h1>
      {isFetchPending ? (
        <div className='text-center'>
          <div className='spinner-border' role='status'>
          </div>
        </div>
      ) : (
        <div className='row'>
          {pizzas.map((pizza) => (
            <div key={pizza.id} className='col-md-4 mb-4'>
              <div className='card text-center'>
                <div className='card-body'>
                  <p className='card-title'>Pizza neve: {pizza.name}</p>
                  <h5 className='card-text'>Gluténmentes-e: {pizza.isGlutenFree}</h5>
                  <img src={pizza.imgUrl} className='card-img-top w-50' alt={pizza.name}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
