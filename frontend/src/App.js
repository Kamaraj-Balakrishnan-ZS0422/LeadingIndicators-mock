import './App.css';
import AppRoutes from './routes/AppRoutes';
import { TranslationProvider } from './context/TranslationContext';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userLogin } from "./redux/loginSlice";
import {jwtDecode} from "jwt-decode";

function App() {
  const dispatch = useDispatch();

  // Check for token in URL and localStorage
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let token = params.get('token') || localStorage.getItem('jwtToken');

  useEffect(() => {
    if (token) {
      try {
        // Decode the token and update the state
        const{ user,exp } = jwtDecode(token);

        if (Date.now() >= exp * 1000) {
          throw new Error("Token expired");
          
        }
        // Dispatch the login action and store the token
        dispatch(userLogin(user));
        localStorage.setItem('jwtToken', token);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, [token, dispatch]);

  const user = useSelector((state) => state.login.user);
  const isLogged = user ? user.isLogged : false;
  const isAdmin = user ? user.isAdmin : false;

  return (
    <TranslationProvider>
    <AppRoutes isLogged={isLogged} isAdmin={isAdmin}/>
    </TranslationProvider>
  );
}

export default App;
