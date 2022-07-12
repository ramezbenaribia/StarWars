import React from 'react'
import ReactDOM from 'react-dom/client'
import { IntlProvider } from 'react-intl'
import App from './App'
import './index.css'
import getUserLocale from 'get-user-locale';


const userLocale = getUserLocale();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* getUserLocale will get the location of the user and format the date to its zone 
      -> we can change 'userLocale' to 'de-DE' to see the difference 
    */}
    <IntlProvider locale={userLocale} >

      <App />
    </IntlProvider>
  </React.StrictMode>
)
