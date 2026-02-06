import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { GoogleOAuthProvider } from '@react-oauth/google';
<<<<<<< HEAD
=======
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
>>>>>>> f534e5395664b52478869101409bdbffd8ff082d

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <GoogleOAuthProvider clientId="878263761108-nnait908lmtn1v4copu10sqv75g9cb85.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
=======
    
  <AuthProvider>
    <GoogleOAuthProvider clientId="878263761108-nnait908lmtn1v4copu10sqv75g9cb85.apps.googleusercontent.com">
      
        <BrowserRouter>
          <App />
        </BrowserRouter>
      
      </GoogleOAuthProvider>
      </AuthProvider>
  </React.StrictMode>
);

export default root;
>>>>>>> f534e5395664b52478869101409bdbffd8ff082d
