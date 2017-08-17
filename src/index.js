import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App"
import { BrowserRouter } from "react-router-dom"
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import thunk from 'redux-thunk';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import reducer from "./reducers/root_reducer"
import registerServiceWorker from "./registerServiceWorker"
import injectTapEventPlugin from "react-tap-event-plugin"

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
