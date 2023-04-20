import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import logger from 'redux-logger';
import App from './App';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    case 'SET_PLANTS':
      return action.payload;
    default:
      return state;
  }
};

// TODO Write code for Sagas

function* fetchPlantList() {
  try {
    const plants = yield axios.get('/api/plant');
    yield put({ type: 'SET_PLANTS', payload: plants.data})
  } catch (error ){
    console.log(`Error in fetchPlantList ${error}`);
    alert(`Something went wrong, dude`);
  }
}



// createSagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// rootSaga
function* rootSaga() {
  // Sagas go here
  yield takeEvery('FETCH_PLANT_LIST', fetchPlantList)
}

const store = createStore(
  combineReducers({ 
    plantList
   }),
   applyMiddleware(sagaMiddleware, logger)
);

// sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);