"use client";

import React, { useEffect, useState } from 'react';

interface Item {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  item_name: string;
  quantity: number;
}

interface Table {
  name: string;
}

const Tablerendering = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('items');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/tables/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTables(data);
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/${selectedTable}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          if (selectedTable === 'items') {
            setItems(data);
            setOrders([]);
          } else if (selectedTable === 'orders') {
            setOrders(data);
            setItems([]);
          }
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, [selectedTable]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px', padding: '10px', borderRight: '1px solid #ddd' }}>
        <h3>Tables</h3>
        <ul>
          {tables.map((table, index) => (
            <li key={index} onClick={() => setSelectedTable(table.name)} style={{ cursor: 'pointer' }}>
              {table.name}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ padding: '10px' }}>
        <h1>{selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)} List</h1>
        <ul>
          {selectedTable === 'items' && items.map(item => (
            <li key={item.id}>{item.name}: ${item.price}</li>
          ))}
          {selectedTable === 'orders' && orders.map(order => (
            <li key={order.id}>{order.item_name}: {order.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tablerendering;
