import React, { Component } from 'react';
import CoinLine from './CoinLine/CoinLine';
import axios from '../../Axios/Coinbase';
import Aux from '../../hoc/Aux';



class CoinLines extends Component {

    state = {
        eurExchangeRate: 0,
        coins: [
            { name: 'Bitcoin', symbol: 'BTC', amount: 0.05194930, bookcost: 482.47, marketvalue: 0, profitloss: 0, high: 14927.60 },
            { name: 'Bitcoin Cash', symbol: 'BCH', amount: 0.21559301, bookcost: 190.47, marketvalue: 0, profitloss: 0, high: 3667.07 },
            { name: 'Etherium', symbol: 'ETH', amount: 2.62329795, bookcost: 1076.86, marketvalue: 0, profitloss: 0, high: 1097.63 },
            { name: 'Litecoin', symbol: 'LTC', amount: 1.58222096, bookcost: 197.64, marketvalue: 0, profitloss: 0, high: 126.66 },
            { name: 'BAT', symbol: 'BAT', amount: 645.31832075, bookcost: 111.97, marketvalue: 0, profitloss: 0, high: 0.8221 },
            { name: 'BSV', symbol: 'BSV', amount: 0.21559301, bookcost: 0.00, marketvalue: 37.49, profitloss: 37.49, high: 396.23 },
            { name: 'Ripple', symbol: 'XRP', amount: 330.39223800, bookcost: 100.00, marketvalue: 0, profitloss: 0, high: 3.18 },
            { name: 'Stella Lumens', symbol: 'XLM', amount: 10483.9644681, bookcost: 600.00, marketvalue: 0, profitloss: 0, high: 0.7775 }]
    }

    componentDidMount() {
        console.log('CoinLines Did Mount');
        
        
        axios.get('/exchange-rates')
        .then(response => {
            this.setState({eurExchangeRate: response.data.data.rates.EUR});
        })
        .catch(error => {
            //setError(true);
            //alert(error.message);
        }, []);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    totalHandler = (symbol, marketValue, profitLoss) => {
        const elementsIndex = this.state.coins.findIndex(element => element.symbol === symbol);
        let newArray = [...this.state.coins];
        newArray[elementsIndex] = { ...newArray[elementsIndex], marketvalue: marketValue, profitloss: profitLoss };
        this.setState({ coins: newArray });
    }

    render() {

        let bookCostTotal = 0;
        let marketValueTotal = 0;
        let profitLossTotal = 0;

        let formatter = new Intl.NumberFormat('en-IR', {
            style: 'currency',
            currency: 'EUR'
        });

        return (
            <Aux>{
                this.state.coins.map(coin => {

                    bookCostTotal += coin.bookcost;
                    marketValueTotal += coin.marketvalue;
                    profitLossTotal += coin.profitloss;

                    return (
                        <CoinLine
                            key={coin.symbol}
                            Name={coin.name}
                            Symbol={coin.symbol}
                            Amount={coin.amount}
                            BookCost={coin.bookcost}
                            High={coin.high}
                            totalHandler={this.totalHandler}
                            togglePriceHandler={this.props.togglePriceHandler}
                            eurExchangeRate={this.state.eurExchangeRate} />

                    )
                })
            }
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td align="right">{formatter.format(bookCostTotal)}</td>
                    <td></td>
                    <td align="right">{formatter.format(marketValueTotal)}</td>
                    <td style={(profitLossTotal < 0) ? { color: 'red' } : {color: 'black'}} align="right">{formatter.format(profitLossTotal)}</td>
                    <td></td>
                    <td></td>
                </tr>
            </Aux>
        )
    }
}

export default CoinLines;
