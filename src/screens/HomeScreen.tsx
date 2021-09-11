import { useEffect } from 'react';
import { usePrices } from '../hooks/usePrices';

export const HomeScreen = () => {

    const delay = 8000;
    const { price, loadPrices } = usePrices();        

    useEffect(() => {        
        setInterval(() => loadPrices(), delay);        
    }, [loadPrices])

  
    return (
      
        <div style={homeScreenStyles}>
          <h1 style={titleStyle}>Cotización de las criptomonedas</h1>
            <div>
                <table style={tableStyle}>
                    <tr>
                        <td><b>Moneda</b></td><td><b>Valor</b></td><td><b>Moneda de referencia</b></td>
                    </tr>
                    <tr>                        
                        <td>{price?.curr0}</td><td>{price?.lprice0}</td><td>{price?.curr2}</td>
                    </tr>
                    <tr>                        
                        <td>{price?.curr1}</td><td>{price?.lprice1}</td><td>{price?.curr2}</td>
                    </tr>
                </table>
            </div>
            
            {/*<button className="btn btn-primary"  onClick={() => loadPrices()}>
                    pressme
    </button>*/}
        </div>
        
    )

}

const titleStyle = {   
    "alignContent": 'center',
    "background-color" : "blue",
    "color" : "white",
    "text-color": 'white',
    "text-align": 'center',	
};

const homeScreenStyles = {
    "margin": 0,
	"padding": 0,
	"outline": 0,
	"boxsizing" : "border-box",
  }

const tableStyle = {    
    margin: '0 auto',
    "background-color" : "blue",    
    "color": 'white',
    "border": 'black solid 0.2em',
    "text-align": 'center',	
}