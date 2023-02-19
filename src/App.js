import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

// Routes
// import Home from './pages/home';
import Pomo from './components/pomo';
// import Break from './components/break';
// import Reports from "./components/report"
import ErrorPage from './components/errorPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Pomo />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: '/',
    //     element: <Pomo />,
    //   },
    //   // {
    //   //   path: '/break',
    //   //   element: <Break />,
    //   // },
    //   // {
    //   //   path: "/reporting",
    //   //   element: <Reports />
    //   // },
    // ],
  },

]);
/**
 *
 * @return {Component} App component
 */
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <RouterProvider router = {router} />
        </header>
      </div>
    </Provider>
  );
}

export default App;
