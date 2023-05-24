import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';

// Routes
// import Home from './pages/home';
import Pomo from './components/pomo';
// import Break from './components/break';
// import Reports from "./components/report"
import ErrorPage from './components/errorPage';
import { useSelector } from 'react-redux';
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
  const modeRedux = useSelector((state) => state.mode.currentMode);
  return (
    <div className="App">
      <header className={`App-header ${modeRedux}`}>
        <RouterProvider router = {router} />
      </header>
    </div>
  );
}

export default App;
