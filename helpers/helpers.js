const username = import.meta.env.VITE_BELVO_SECRET_ID;
const password = import.meta.env.VITE_BELVO_SECRET_PASSWORD;

export const fetchTransactions = async () => {
    const credentials = btoa(`${username}:${password}`); 
  
    try {
      const response = await fetch('https://sandbox.belvo.com/api/transactions', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

export const fetchLinks = async () => {
    const credentials = btoa(`${username}:${password}`); 
  
    try {
      const response = await fetch('https://sandbox.belvo.com/api/links', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Error fetching links');
      }
  
      const data = await response.json();
      console.log(data);
      if(data.count == 0){
        throw new Error('La cuenta no tiene links para consultar las transacciones');
      }
      return data;
    } catch (error) {
      console.error('Hubo un error al leer los links de la cuenta: ', error.message);
      throw error;
    }
  };

