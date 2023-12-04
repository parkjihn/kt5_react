import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incCount, decCount, resetCart, addItem } from './components/store.js';
import './App.css';

function App() {

  const items = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetCart());
    localStorage.removeItem('cart');
  };

  const handleAddItem = () => {
    const title = prompt('Введите название товара:');
    if (title) {
      dispatch(addItem(title));
    }
  };

  return (

    <div className="app-container">
      <button onClick={handleReset} className="button reset-button">Сбросить корзину</button>
      <button onClick={handleAddItem} className="button add-button">Добавить товар</button>

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <h2>{item.title}</h2>
          <p>Кол-во: {item.count}</p>
          <button onClick={() => dispatch(incCount(item.id))} className="button">+</button>
          <button onClick={() => dispatch(decCount(item.id))} className="button">-</button>
        </div>

      ))}
    </div>
  );
}

export default App;
