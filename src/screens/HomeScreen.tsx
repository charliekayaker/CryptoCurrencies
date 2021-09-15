import { useEffect, useState } from 'react';
import { getPrice } from '../api/getPrice';
import usePrices from '../hooks/usePrices';
import { Price } from '../interface/PricesResponse';


export const HomeScreen = () => {

    const delay = 4000;
    const ETH = 'ETH';
    const BTC = 'BTC';
    var currentPrice0: string = '0.00';
    var currentPrice1: string = '0.00'
    var lastPrice0: string = '0.00';
    var lastPrice1: string = '0.00';

    const { price, setPrice } = usePrices();

    const [_className0, setClassName0] = useState<string>();
    const [_className1, setClassName1] = useState<string>();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        setInterval(() => execute(), delay);

    }

    const execute = () => {
        loadPrices();
    }

    const loadPrices = async () => {

        try {
            const response0 = await getPrice(ETH).get<Price>('');
            const response1 = await getPrice(BTC).get<Price>('');
            if (response0.data != null) {
                const resp: Price = {
                    lprice: '',
                    curr0: response0.data.curr1,
                    lprice0: response0.data.lprice,
                    curr1: response1.data.curr1,
                    lprice1: response1.data.lprice,
                    curr2: response0.data.curr2,
                }
                registerValues(resp);
                setPrice(resp);

            }

        } catch (error) {
            const price = getMock();
            /*  registerValues(price);
              setPrice(price);*/
        }

        if (parseFloat(currentPrice0) !== parseFloat(lastPrice0)) {

            let checked0 = parseFloat(currentPrice0) < parseFloat(lastPrice0);

            setClassName0(checked0 ? 'parpadea_r' : 'parpadea_v');

            setTimeout(() => setClassName0('priceStyle'), 3000);
        }

        if (parseFloat(currentPrice1) !== parseFloat(lastPrice1)) {

            let checked1 = parseFloat(currentPrice1) < parseFloat(lastPrice1);

            setClassName1(checked1 ? 'parpadea_r' : 'parpadea_v');

            setTimeout(() => setClassName1('priceStyle'), 3000);
        }
    }

    const getMock = () => {
        let mockPrice: Price = {
            lprice: '',
            lprice0: getMockValue(getRandom(), ETH),
            lprice1: getMockValue(getRandom(), BTC),
            curr0: 'ETH',
            curr1: "BTC",
            curr2: "USD",
        }

        return mockPrice;
    }

    const registerValues = (param: Price) => {

        if (lastPrice0 === '0.00') {
            lastPrice0 = param.lprice0;
        } else {
            lastPrice0 = currentPrice0;
        }
        currentPrice0 = param.lprice0;

        if (lastPrice1 === '0.00') {
            lastPrice1 = param.lprice1;
        } else {
            lastPrice1 = currentPrice1;
        }
        currentPrice1 = param.lprice1;
    }

    const getRandom = () => {
        return Math.round(Math.random() * 5);
    }

    const btcValues: number[] = [8990.55, 9000.32, 9101.23, 8999.78, 9200.13, 9114.37];
    const ethValues: number[] = [3999.31, 3994.12, 4001.23, 4005.78, 3909.13, 4115.37];

    const getMockValue = (position: number, currency: string) => {
        if (currency === ETH)
            return ethValues[position].toString();
        else if (currency === BTC)
            return btcValues[position].toString();
        else throw Error('Valor no contemplado . . .');
    }

    return (

        <div style={homeScreenStyles}>
            <h1 style={titleStyle}>Cotización de las criptomonedas</h1>
            <div>
                <table style={tableStyle}>
                    <tbody style={{ textAlign: 'center' }}>
                        <tr>
                            <td style={headerTableStyle}><b>Moneda</b></td><td style={headerTableStyle}><b>Valor</b></td><td style={headerTableStyle}><b>Moneda de referencia</b></td>
                        </tr>
                        <tr>
                            <td>{price?.curr0}</td><td className={_className0}>{price?.lprice0}</td><td>{price?.curr2}</td>
                        </tr>
                        <tr>
                            <td>{price?.curr1}</td><td className={_className1}>{price?.lprice1}</td><td>{price?.curr2}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/*<button className="btn btn-primary"  onClick={() => loadPrices()}>
                    pressme
    </button>*/}
        </div>

    )

}

const titleStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: "purple",
    color: "white",
    textColor: 'white',
}

const homeScreenStyles = {
    margin: 0,
    padding: 0,
    outline: 0,
    boxsizing: "border-box",
}

const tableStyle = {
    margin: '0 auto',
    backgroundColor: 'purple',
    color: 'white',
    border: 'black solid 0.2em',
    alignItems: 'center',
}

const priceStyle = {
    backgroundColor: 'white',
    color: 'black',
    textColor: 'black',
}

const headerTableStyle = { borderBottom: 'white solid .1em' }
