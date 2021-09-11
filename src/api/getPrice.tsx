import axios from 'axios';

export const getPrice = (currencie : String) => axios.create({
    baseURL: 'https://cex.io/api/last_price/'+ currencie +'/USD',  
  }
);