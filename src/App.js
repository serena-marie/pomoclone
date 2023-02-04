import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// Routes
import Pomo from "./components/pomo"
import ErrorPage from './components/errorPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Pomo />,
    errorElement: <ErrorPage />
  }
])
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <RouterProvider router = {router} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
