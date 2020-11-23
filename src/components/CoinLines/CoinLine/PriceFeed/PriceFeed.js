import React, { useState, useRef, useEffect } from 'react';
import coinbasePro from '../../../../Axios/CoinbasePro';
import coinbase from '../../../../Axios/Coinbase';
import Aux from '../../../../hoc/Aux';
import './PriceFeed.css';

const PriceFeed = (props) => {

    let [price, setPrice] = useState(0);
    let [loading, setLoading] = useState(true);
    //let [error, setError] = useState(false);
    const upArrow = "\u2191";
    const downArrow = "\u2193";

    const prevPrice = usePrevious(price);

    const marketValue = useRef(0);
    marketValue.current = price * props.Amount;

    const profitLoss = useRef(0);
    profitLoss.current = marketValue.current - props.BookCost;

    const intervalRef = useRef();

    let priceDiffPercentage = (props.High / price) * 100;

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      }

    const getCoins = () => {

        let urlExchange = '/products/' + ((props.Symbol === 'BAT') ?  'BAT-USDC/ticker' : props.Symbol + '-EUR/ticker');
        let exchange = coinbasePro;

        switch(props.Symbol)
        {
            case 'BAT':
                urlExchange = '/products/BAT-USDC/ticker';
                break;
            case 'BSV':
                urlExchange = '/prices/BSV-EUR/spot';
                exchange = coinbase;
                break;            
            default:
                urlExchange = '/products/' + props.Symbol + '-EUR/ticker';
                break;
        }

        exchange.get(urlExchange)
            .then(response => {
                if (props.Symbol==='BAT')
                    setPrice(response.data.price * props.eurExchangeRate);
                else if (props.Symbol==='BSV')
                    setPrice(response.data.data.amount);
                else
                    setPrice(response.data.price);
                setLoading(false);
                props.totalHandler(props.Symbol, marketValue.current, profitLoss.current);
                console.log(props.Symbol + ' Got Price: ' + price + ' Market Value: ' + marketValue.current);
            })
            .catch(error => {
                //setError(true);
                //alert(error.message);
            }, []);
    }

    useEffect(() => {
        console.log('PriceFeed useEffect');

        const id = setInterval(() => {
            if (props.togglePriceHandler() === 1)
                getCoins();
        }, 5000);

        intervalRef.current = id;

        return () => clearInterval(intervalRef.current);

    });

    let formatter = new Intl.NumberFormat('en-IR', {
        style: 'currency',
        currency: 'EUR',
    });

    let formatter2 = new Intl.NumberFormat('en-IR', {
        style: 'decimal',
        maximumFractionDigits: '8',
    });

    let formatter3 = new Intl.NumberFormat('en-IR', {
        style: 'decimal',
        minimumFractionDigits: '4',
        maximumFractionDigits: '4',
    });

    const priceLine =
        (loading) ?
            <Aux>
                <td align="right">loading...</td>
                <td align="right">loading...</td>
                <td align="right">loading...</td>
                <td align="right">loading...</td>
                <td align="right">loading...</td>
            </Aux>
            :
            <Aux>
                <td align="right"><div className={(prevPrice <= price) ?  "fadeGreen" : "fadeRed" }>{formatter2.format(price)}<span className="arrowUpDown">{(prevPrice <= price) ? upArrow : downArrow}</span><span className="diff">{formatter3.format(price - prevPrice)}</span></div></td>
                <td align="right" style={(marketValue.current < 0) ? { color: 'red'} : {color: 'black'} }>{formatter.format(marketValue.current)}</td>
                <td style={(profitLoss.current < 0) ? { color: 'red' } : {color: 'black'}} align="right">{formatter.format(profitLoss.current)}</td>
                <td align="right">{props.High}</td>
                <td align="right">{priceDiffPercentage.toFixed(0)}%</td>
            </Aux>

    return (priceLine);

}

export default React.memo(PriceFeed);