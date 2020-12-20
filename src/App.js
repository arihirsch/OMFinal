import React from "react"
import { Route, Switch } from "react-router-dom"
import DilationPage from "./DilationPage"
import EntropyPage from "./EntropyPage"

import HomePage from "./HomePage"

function App() {
    return (
        <main>
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/dilation" component={DilationPage} />
                <Route path="/entropy" component={EntropyPage} />
                <Route component={Error} />
            </Switch>
        </main>
    )
}
export default App