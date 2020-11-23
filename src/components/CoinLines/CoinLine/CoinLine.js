import React, {useEffect} from 'react';
import PriceFeed from './PriceFeed/PriceFeed';


const CoinLine = (props) => {

    let formatter = new Intl.NumberFormat('en-IR', {
        style: 'currency',
        currency: 'EUR',
    });

    useEffect(() => {
        console.log('Mounted CoinLine');
    });


    return (
        <tr>
            <td align="left">{props.Name}</td>
            <td align="left">{props.Symbol}</td>
            <td align="right">{props.Amount.toFixed(8)}</td>
            <td align="right">{formatter.format(props.BookCost)}</td>
            <PriceFeed eurExchangeRate={props.eurExchangeRate} Symbol={props.Symbol} Amount={props.Amount} BookCost={props.BookCost} High={props.High} totalHandler={props.totalHandler} togglePriceHandler={props.togglePriceHandler}/>
        </tr>
    );
}

export default React.memo(CoinLine); 