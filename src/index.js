import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home/Home';
import Poll from './components/Poll/Poll'
import registerServiceWorker from './registerServiceWorker';
import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { watchCreatePoll, watchPoll, watchAuth, watchHome, watchSettings } from './store/sagas/index'

import createPollReducer from './store/reducers/createPollR'
import pollReducer from './store/reducers/pollR'
import authReducer from './store/reducers/authR'
import homeReducer from './store/reducers/homeR'
import settingsReducer from './store/reducers/settingsR'


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    createPoll: createPollReducer,
    poll: pollReducer,
    auth: authReducer,
    home: homeReducer,
    settings: settingsReducer
})

const sagaMiddle = createSagaMiddleware() 

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddle)))

sagaMiddle.run(watchCreatePoll)
sagaMiddle.run(watchPoll)
sagaMiddle.run(watchAuth)
sagaMiddle.run(watchHome)
sagaMiddle.run(watchSettings)


const App = (
    <Provider store={store}>       
        <BrowserRouter> 
        <Switch>
            <Route path="/page/:id" component={Home} />
            <Route path="/:id" component={Poll} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
        </Switch>
        </BrowserRouter>
    </Provider>
)



ReactDOM.render(App , document.getElementById('root'));
registerServiceWorker();
