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
            <h1>Origins and Meaning Visualizer</h1>
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
                        <Button type="button" className="btn btn-primary btn-lg text-nowrap" size="lg">Penny Entropy</Button>
                    </Link>
                </Col>
            </Row>
        </header>
    </div>

  );
}

export default HomePage;
