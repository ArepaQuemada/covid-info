import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#80d8ff',
      dark: '#49a7cc',
      light: '#b5ffff'
    },
    secondary: {
      main: '#ff1744',
      dark: '#c4001d',
      light: '#ff616f'
    },
    alert: {
      main: '#FEEA3B'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App theme={theme}/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
