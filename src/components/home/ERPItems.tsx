
import React, { useEffect, useState } from 'react';
import { fetchItems } from '../lib/api';

const ERPItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems();
      setItems(data);
      setLoading(false);
    };
    loadItems();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading products...</div>;

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.item_code} className="border p-2 rounded-lg shadow hover:shadow-md transition">
          <img
            src={item.image || '/img404.webp'}
            alt={item.item_name}
            className="w-full h-36 object-contain bg-white rounded"
          />
          <div className="mt-2 font-semibold text-sm">{item.item_name}</div>
          <div className="text-xs text-gray-500">{item.description?.slice(0, 40)}...</div>
        </div>
      ))}
    </div>
  );
};

export default ERPItems;
