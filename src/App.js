import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

// Routes
import Home from "./pages/home"
import Pomo from "./components/pomo"
import Break from "./components/break"
// import Reports from "./components/report"
import ErrorPage from './components/errorPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/pomo",
        element: <Pomo />
      },
      {
        path: "/break",
        element: <Break />
      },
      // {
      //   path: "/reporting",
      //   element: <Reports />
      // },
    ],
  },
  
])
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router = {router} />
      </header>
    </div>
  );
}

export default App;
