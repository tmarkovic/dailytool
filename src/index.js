import { Grommet } from 'grommet';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Daily from './Daily';
import { grommet } from 'grommet/themes';
ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={grommet} full>
      <Daily />
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
