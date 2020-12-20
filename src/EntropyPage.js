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
                    <h1>Entropy with Coins</h1>
                    <h4 className="Page-subheader">Look at the arrangement of the coins: H = Heads, T = Tails</h4>
                    <h6 className="grey-text">Unform arrangements have low entropy, ~50/50 arrangements have high entropy -- scroll down for explanation!</h6>
                </div>
                <header className="coin-container">
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
                                Flip Coins Once
                            </Button>
                        </Col>
                        <Col>
                            <Button className="text-nowrap"variant="primary" size="lg" onClick={this.flipUntilUniform}>
                                Flip Until Uniform
                            </Button>
                            <h6 className="padding-top-10px">{this.state.num_attempts? "" : "This may take a while..."}</h6>
                            <h6>{this.state.num_attempts? "" : "It will finish, just be patient!"}</h6>
                            <h6>{this.state.num_attempts? "Attempts: " + this.state.num_attempts.toLocaleString(): ""}</h6>
                        </Col>
                    </Row>
                    <Row className="padding-top-10px padding-bottom-80px">
                    <p className="grey-text padding-top-10px">
                        “Imagine you vigorously shake a bag containing a hundred pennies and then dump them <br/>
                        out on your dining room table. If you found that all hundred pennies were heads, <br/>
                        you’d surely be surprised.” (Until The End of Time, Brian Greene)<br/>
                        <br/>
                        Although this example uses 25 coins rather than 100 (for practical reasons), <br/>
                        this explanation of entropy still holds. There are many, many configurations <br/>
                        of 25 coins in which roughly half are heads and half are tails. <br/>
                        However, there are only TWO(2) uniform configurations, in which all are heads or all are tails. <br/>
                        If we ever saw coins uniformly arranged like this, we would assume that someone arranged them that way. <br/>
                        <br/>
                        “The entropy of a given configuration of the pennies is the size of its group — <br/>
                        the number of fellow configurations that pretty much look like the given configuration. <br/>
                        If there are many such look-alikes, the given configuration has high entropy. <br/>
                        If there are few such look-alikes, the given configuration has low entropy. <br/>
                        All else being equal, a random shake is more likely to belong to a group with higher entropy <br/>
                        since such groups have more members.” (Until The End of Time, Brian Greene)<br/>
                        <br/>
                        The button on the left allows you to flip all 25 coins. You can click it as many times as you want. <br/>
                        I'd be shocked if you ever got a uniform arrangement that way. <br/>
                        <br/>
                        The button on the right is a little more interesting. It will flip all 25 coins over and over again, <br/>
                        until it reaches a uniform state -- all heads or all tails. Right under the button it will list <br/>
                        just how many times the computer had to flip all 25 coins to reach that state. This often takes <br/>
                        tens of millions of attempts, given that the probability of such a state is 1 in 16,777,216. <br/>
                        As a result, when you click this button, the page will "freeze" for a bit. <br/>
                        But it will eventually reach that point, so just be patient! This is why I chose to show <br/>
                        25 coins instead of 100. I didn't want to make you wait more than a couple of minutes to see results. <br/>
                        <br/>
                        The most interesting implication of this phenomenon relates to the big bang. <br/>
                        The big bang happened as a result of an incredibly low entropy configuration of matter. <br/>
                        Many people assume that something (often, a god) must have created this configuration and thus <br/>
                        set off the big bang, setting the creation of the universe in motion. However, just as we can <br/>
                        see with the coins here, with enough attempts, we will eventually reach a uniform, low entropy configuration. <br/>
                        Therefore, perhaps the big bang could have occurred without the guiding hand of a god. Instead, it could <br/>
                        have come out of time and randomness.
                    </p>
                </Row>
                </header>
            </div>
    
        );
    }


}

export default EntropyPage;
