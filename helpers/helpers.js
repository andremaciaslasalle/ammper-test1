import axios from 'axios';

const username = "b2aa0b91-9807-4549-ba58-41de805b1982";
const password = "#dVDO3-V_rQijF*IMqsvcXFzPvmxviIrWNKjAHYMT4*ddNMubor9r9xoQvBNGaS#";
const link = "9b9ec917-0146-4c53-904e-4860cc2d437f";

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