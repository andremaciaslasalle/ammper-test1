import axios from 'axios';

const username = import.meta.env.VITE_BELVO_SECRET_ID;
const password = "#dVDO3-V_rQijF*IMqsvcXFzPvmxviIrWNKjAHYMT4*ddNMubor9r9xoQvBNGaS#";
const link = import.meta.env.VITE_BELVO_LINK;

export const fetchTransactions = async () => {
  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await axios.get(`https://sandbox.belvo.com/api/transactions?page=1&page_size=1000&link=${link}`, {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};