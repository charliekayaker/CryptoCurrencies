import {  useState } from "react";
import { getPrice } from "../api/getPrice";
import { Price } from '../interface/PricesResponse';

export const usePrices = () => {

    const ETH = 'ETH';
    const BTC = 'BTC';

    const [price, setPrice] = useState<Price>({
        curr0: 'BTC',
        curr1: 'ETH',
        curr2: 'USD',
        lprice: '',
        lprice0: 'LOADING . . .',
        lprice1: 'LOADING . . .',
    });

  
    const loadPrices = async () => {
       
        try {
            const response0 = await getPrice(ETH).get<Price>('');
            const response1 = await getPrice(BTC).get<Price>('');

            if (response0.data ) {
                const resp : Price = {
                    lprice: '',
                    curr0 : response0.data.curr1,
                    lprice0 : response0.data.lprice,
                    curr1 : response1.data.curr1,
                    lprice1 : response1.data.lprice,
                    curr2 : response0.data.curr2,
                }
                
                setPrice(resp);
            }
        } catch (error) {
            setPrice(mockPrice);
        }
    }
   
    const getRandom = () =>{
        return Math.round(Math.random()*5);
    }

    const btcValues : number[] = [8990.55, 9000.32, 9101.23, 8999.78, 9200.13, 9114.37];
    const ethValues : number[] = [3999.31, 3994.12, 4001.23, 4005.78, 3909.13, 4115.37];

    const getMockValue = (position : number, currency : string) =>{
        if(currency === ETH)
            return ethValues[position].toString();
        else if(currency === BTC)
            return btcValues[position].toString();
        else throw Error('Valor no contemplado . . .');    
    }

     //Mock
     const mockPrice: Price = {
        lprice: '',
        lprice0: getMockValue(getRandom(), ETH),
        lprice1: getMockValue(getRandom(), BTC), 
        curr0: 'ETH',
        curr1: "BTC",
        curr2: "USD",
    }

    return {
        price,
        loadPrices,
    }
}
