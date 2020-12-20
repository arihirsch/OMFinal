import * as React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Col, Row } from 'react-bootstrap';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

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

    if (counter === 0 && dilatedCounter === 0) {
        c_percentage = 0
    }

    React.useEffect(() => {
        setTimeout(() => setCounter(counter + 1), 1000);
        }, [counter]);
    
    let c = 299792 // speed of light in milliseconds
    let dilatedCounterPeriod
    if (c_percentage === 100) {
        dilatedCounterPeriod = Infinity
    } 
    else {
        let v = c * (c_percentage / 100)
        let denom = Math.sqrt(1 - ((v ** 2) / (c ** 2)))
    
        dilatedCounterPeriod = 1000 / denom
    }

    React.useEffect(() => {
        setTimeout(() => setDilatedCounter(dilatedCounter + 1), dilatedCounterPeriod === Infinity ? 2147483647 : dilatedCounterPeriod);
        }, [dilatedCounter, dilatedCounterPeriod]);

    return (
        <div className="App">
            <div className="Page-header">
                <h1>Time Dilation</h1>
                <h4 className="Page-subheader">Move the slider to view the effects of motion on the passage of time</h4>
                <h6 className="grey-text">Afterwards, scroll down and read the explanation!</h6>
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
                <Row className="padding-top-10px padding-bottom-80px">
                    <p className="grey-text padding-top-10px">
                        As hard as it is to believe, given two clocks where one is in motion relative to the other, <br/>
                        the clock in motion will tick slower. At human speeds, this difference is minute, so minute, <br/>
                        in fact, that we will likely never notice it in our lives. <br/>
                        <br/>
                        Time dilation is, however, a real phenomenon. This tool lets you set a clock in motion <br/>
                        at velocities as a percentage of the speed of light in order to see how time changes <br/>
                        (relative to a clock at rest). Play with the slider on the right and watch the clocks <br/>
                        go out of sync! Also, notice that at 100%, the clock stops ticking all together!<br/>
                        <br/>
                        This is a mathematically accurate representation of this phenomenon. The clock period <br/>
                        for the clock on the left is set at 1000 milliseconds, or one second. The clock period <br/>
                        on the right dynamically updates based on the position of the slider. The code takes <br/>
                        the percentage set by the user on the slider and computes the following: <br/>
                        v = c * (percentage / 100) <br/>
                        t' = t / (sqrt(1 - (v^2/c^2))) <br/>
                        Where: v is the relative velocity of the clock on the right, c is the speed of light, <br/>
                        t is the left clock's clock period (1000ms), and t' is the right clock's clock period. <br/>
                        <br/>
                        This visualization should help the user see just how exponential this function is. <br/>
                        Lower percentages make small differences in clock period. But higher percentages make <br/>
                        a massive difference! When the slider is set to 100%, and v = c, the formula creates <br/>
                        a division by zero error, so there is no clock period! Theoretically, at the speed of light,<br/>
                        time wouldn't pass at all.
                    </p>
                </Row>
            </header>
        </div>

    );
}

export default DilationPage;
