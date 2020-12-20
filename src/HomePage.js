import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import {Link} from "react-router-dom";

function HomePage() {
  return (
    <div className="App">
        <div className="Page-header">
            <h1>The Arrow of Time Playground</h1>
        </div>
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Row className="home-btn-container">
                <Col>
                    <Link to="/dilation">
                        <Button type="button" className="btn btn-primary btn-lg text-nowrap" size="lg">Time Dilation</Button>
                    </Link>
                </Col>
                <Col>
                    <Link to="/entropy">
                        <Button type="button" className="btn btn-primary btn-lg text-nowrap" size="lg">Entropy of Coins</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="padding-top-10px">
                <p className="grey-text padding-top-10px">Made using React and React-Bootstrap. <br/>
                Deployed with Vercel. <br/>
                Check out the source code here: <a href="https://github.com/arihirsch/OMFinal">Github</a></p>
            </Row>
        </header>
    </div>

  );
}

export default HomePage;
