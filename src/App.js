import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/App.scss';

// Routes
import Pomo from './pages/pomo';
import ErrorPage from './pages/errorPage';
import { useSelector } from 'react-redux';
import { Header } from './components/header';
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
    <div className={`App ${modeRedux}`}>
      <Header/>
      <RouterProvider router = {router} />
    </div>
  );
}

export default App;
