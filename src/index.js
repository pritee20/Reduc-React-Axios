import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider} from 'react-redux';
import rootReducer from './reducers/rootReducer';

import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));