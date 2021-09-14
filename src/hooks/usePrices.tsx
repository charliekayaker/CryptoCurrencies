import {  useState } from "react";
import { getPrice } from "../api/getPrice";
import { Price } from '../interface/PricesResponse';

const priceInitial : Price = { 
    curr0: 'BTC',
    curr1: 'ETH',
    curr2: 'USD',
    lprice: '',
    lprice0: '0.00',
    lprice1: '0.00',
}

const usePrices = () => {

    const [price, setPrice] = useState<Price>(priceInitial);

    return {
        price,
        setPrice,
    }
}

export default usePrices;
