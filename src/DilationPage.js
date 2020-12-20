import * as React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Col, Row } from 'react-bootstrap';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const { Handle } = Slider;

let c_percentage = 0

const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} %`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

function updateSpeed(value) {
    c_percentage = value
}

function DilationPage() {

    const [counter, setCounter] = React.useState(0);
    const [dilatedCounter, setDilatedCounter] = React.useState(0);

    if (counter == 0 && dilatedCounter == 0) {
        c_percentage = 0
    }

    React.useEffect(() => {
        setTimeout(() => setCounter(counter + 1), 1000);
        }, [counter]);
    
    let c = 299792 // speed of light in milliseconds
    let dilatedCounterPeriod
    if (c_percentage == 100) {
        dilatedCounterPeriod = Infinity
    } 
    else {
        let v = c * (c_percentage / 100)
        let denom = Math.sqrt(1 - ((v ** 2) / (c ** 2)))
    
        dilatedCounterPeriod = 1000 / denom
    }

    React.useEffect(() => {
        setTimeout(() => setDilatedCounter(dilatedCounter + 1), dilatedCounterPeriod == Infinity ? 2147483647 : dilatedCounterPeriod);
        }, [dilatedCounter, dilatedCounterPeriod]);

    return (
        <div className="App">
            <div className="Page-header">
                <h1>Time Dilation</h1>
                <h4 className="Page-subheader">Move the slider to view the effects of motion on the passage of time</h4>
            </div>
            <header className="App-header">
                <Row className="counter-row">
                    <Col>
                        <h1 className="">{counter}</h1>
                    </Col>
                    <Col className="spacer-col-15em"></Col>
                    <Col>
                        <h1 className="">{dilatedCounter}</h1>
                    </Col>
                </Row>
                <Row className="speed-row Page-subheader">
                    <Col className="slider-container">
                        <h5>At Rest</h5>
                        <h6>0% speed of light</h6>
                        <h6>0 m/s</h6>
                        <h6>Clock period: 1000 ms</h6>
                    </Col>
                    <Col className="spacer-col-15em"></Col>
                    <Col className="slider-container">
                        <Slider onChange={updateSpeed} min={0} max={100} defaultValue={0} handle={handle} />
                        <h6 className="padding-top-10px">{c_percentage}% speed of light</h6>
                        <h6>{(299792458 * (c_percentage / 100)).toFixed(2)} m/s</h6>
                        <h6>Clock period: {dilatedCounterPeriod.toFixed(0)} ms</h6>
                    </Col>
                </Row>
            </header>
        </div>

    );
}

export default DilationPage;
