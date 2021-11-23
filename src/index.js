import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Auth0Provider} from "@auth0/auth0-react";
ReactDOM.render(
   <React.StrictMode>
   <Auth0Provider
   domain="haiders715.us.auth0.com"
    clientId="rTo46YuWlj9XQuhcMsHmvlzSB183Un4B"
    redirectUri={window.location.origin}
   >
   <App />
   </Auth0Provider>
 </React.StrictMode>
  ,
  document.getElementById('root')
);
