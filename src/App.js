import React from 'react';
import { Provider } from 'react-redux';
import Content from './Content'
import './App.css';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Content />
    </Provider>
  );
}

export default App;
