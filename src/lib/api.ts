
import axios from 'axios';

// Base URL and credentials from environment
const ERP_URL = import.meta.env.VITE_ERP_URL;
const API_KEY = import.meta.env.VITE_ERP_API_KEY;
const API_SECRET = import.meta.env.VITE_ERP_API_SECRET;

// Axios instance
const erp = axios.create({
  baseURL: ERP_URL,
  headers: {
    Authorization: `token ${API_KEY}:${API_SECRET}`,
    'Content-Type': 'application/json',
  },
});

// Fetch ERPNext Items
export const fetchItems = async () => {
  try {
    const fields = [
      'item_code',
      'item_name',
      'description',
      'image',
      'stock_uom'
    ];
    const response = await erp.get('/api/resource/Item', {
      params: {
        fields: JSON.stringify(fields),
        limit_page_length: 30,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('❌ Error fetching ERPNext items:', error);
    return [];
  }
};

export default erp;
