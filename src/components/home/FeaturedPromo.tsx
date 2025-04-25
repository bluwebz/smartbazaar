
import { useEffect, useState } from 'react';
import { fetchItems } from '@/lib/api';

const FeaturedPromo = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems();
      setItems(data);
      setLoading(false);
    };
    loadItems();
  }, []);

  if (loading) {
    return <div className="text-center py-6">🔄 Loading items...</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <div key={item.item_code} className="border rounded-xl shadow p-4 bg-white">
          {item.image && (
            <img
              src={item.image}
              alt={item.item_name}
              className="h-32 w-full object-contain mb-2"
            />
          )}
          <h3 className="font-semibold text-lg">{item.item_name}</h3>
          <p className="text-sm text-gray-600">{item.description?.slice(0, 60)}...</p>
          <div className="mt-2 text-sm text-gray-400">UOM: {item.stock_uom}</div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedPromo;
