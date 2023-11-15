import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/App.scss';

// Routes
import Pomo from './pages/pomo';
import ErrorPage from './pages/errorPage';
import { useSelector } from 'react-redux';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Pomo />,
    errorElement: <ErrorPage />,
  },

]);
/**
 *
 * @return {Component} App component
 */
function App() {
  const modeRedux = useSelector((state) => state.mode.currentMode);
  return (
    <div className="app">
      <div className={`appBody ${modeRedux}`}>
        <RouterProvider router = {router} />
      </div>
    </div>
  );
}

export default App;
