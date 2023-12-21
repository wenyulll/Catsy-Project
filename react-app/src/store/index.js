import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import productsReducer from './product';
import reviewsReducer from './review';
import searchReducer from './search';
import shoppingCartReducer from './shoppingCart';
import orderReducer from './order';

const rootReducer = combineReducers({
  session,
  products: productsReducer,
  reviews: reviewsReducer,
  search: searchReducer,
  shoppingCart: shoppingCartReducer,
  order: orderReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
