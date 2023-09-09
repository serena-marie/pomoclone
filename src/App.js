import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/App.scss';

// Routes
import Pomo from './pages/pomo';
import ErrorPage from './pages/errorPage';
import Overview from './pages/overview';
import { useSelector } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Pomo />,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/stats',
    element: <Overview />,
    errorElement: <ErrorPage/>,
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
