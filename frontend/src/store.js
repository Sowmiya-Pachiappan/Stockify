import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import {
  signinReducer,
  signoutReducer,
} from './reducers/AuthReducers';
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from './reducers/ProductReducers';
import {
  invoiceCreateReducer,
  invoiceDetailsReducer,
  invoiceListReducer,
} from './reducers/invoiceReducers';
import { stockHistoryReducer } from './reducers/ReportReducers';
import { profileUpdateReducer } from './reducers/UserReducers';
import { fileDownloadReducer } from './reducers/FileReducers';

const reducers = combineReducers({
  signin: signinReducer,
  signout: signoutReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productList: productListReducer,
  invoiceCreate: invoiceCreateReducer,
  invoiceList: invoiceListReducer,
  invoiceDetails: invoiceDetailsReducer,
  stockHistory: stockHistoryReducer,
  profileUpdate: profileUpdateReducer,
  fileDownload: fileDownloadReducer,
});
const initialState = {
  signin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
};
const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
