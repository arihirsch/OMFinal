import * as React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

// let coins = []

function generateCoins() {
    let coinsFunc = []
    for (let i = 0; i < 5; i++) {
        let sub_coins = []
        for (let i = 0; i < 5; i++) {
            sub_coins.push(Math.random() < 0.5)
        }
        coinsFunc.push(sub_coins)
    }
    return coinsFunc
}



class EntropyPage extends React.Component {

    constructor() {
        super()
        this.state = {coins: generateCoins()}
        this.updateCoins = this.updateCoins.bind(this)
        this.flipUntilUniform = this.flipUntilUniform.bind(this)
    }

    updateCoins() {
        this.setState({
            coins: generateCoins()
        })
    }

    flipUntilUniform() {
        let hidden_coins = generateCoins()
        let counter = 0
        while (!this.coinsAreUniform(hidden_coins)) {
            hidden_coins = generateCoins()
            counter++
        }
        this.setState({
            coins: hidden_coins,
            num_attempts: counter
        })
        console.log("Done!!")
        console.log(counter)
    }

    coinsAreUniform(coins) {
        let coins_list = []
        for (let sub_coins of coins) {
            for (let coin of sub_coins) {
                coins_list.push(coin)
            }
        }
        return coins_list.every((val, i, arr) => val === arr[0])
    }

    render() {
        generateCoins()
        return (
            <div className="App">
                <div className="Page-header">
                    <h1>Entropy</h1>
                    <h4 className="Page-subheader">Look at the coins</h4>
                </div>
                <header className="App-header">
                    {this.state.coins.map((sub_coins, index) => (
                        <Row key={index}>
                            {sub_coins.map((coin, index1) => (
                                <span key={index1} className={coin? "heads" : "tails"}>{coin? "H" : "T"}</span>    
                            ))}
                        </Row>
                    ))}
                    <Row className="spacer-row-2em"></Row>
                    <Row>
                        <Col>
                            <Button variant="primary" size="lg" onClick={this.updateCoins}>
                                Flip Coins
                            </Button>
                        </Col>
                        <Col>
                            <Button className="text-nowrap"variant="primary" size="lg" onClick={this.flipUntilUniform}>
                                Flip Until Uniform
                            </Button>
                            <h6 className="padding-top-10px">{this.state.num_attempts? "" : "This may take a while..."}</h6>
                            <h6>{this.state.num_attempts? "Attempts: " + this.state.num_attempts.toLocaleString(): ""}</h6>
                        </Col>
                    </Row>
                </header>
            </div>
    
        );
    }


}

export default EntropyPage;
