import React, { Component } from 'react';
import CoinLines from '../../components/CoinLines/CoinLines';
import Aux from '../../hoc/Aux';
import {Table,Button} from 'react-bootstrap';


class Dashboard extends Component {

    state = {
        switchedOn: 1
    }

    togglePriceHandler = () => {
        console.log("togglePriceHandler: " + this.state.switchedOn);
        return this.state.switchedOn;
    }

    setPriceHandler = () => {
        this.setState((prevState) => ({ switchedOn: prevState.switchedOn * -1 }));
        console.log("setPriceHandler: " + this.state.switchedOn);
    }

    render() {

        return (
            <Aux>
                <Table striped bordered hover responsive="sm">
                        <thead>
                            <tr>
                                <th>Currency</th>
                                <th>Symbol</th>
                                <th align="right">Amount</th>
                                <th align="right">Book Cost</th>
                                <th align="right">Market Price</th>
                                <th align="right">Market Value</th>
                                <th align="right">Profit/Loss</th>
                                <th align="right">Highest Price</th>
                                <th align="right">Price Difference</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CoinLines togglePriceHandler={this.togglePriceHandler} switchedOn={this.state.switchedOn}/>
                        </tbody>
                 </Table>
                <div style={{padding: "20px", textAlign:"center"}}>
                    <Button variant="secondary" onClick={this.setPriceHandler}>{(this.state.switchedOn===-1) ? 'Start Refresh' : 'Stop Refresh'}</Button>
                </div>
            </Aux>
        );
    }

}

export default Dashboard;