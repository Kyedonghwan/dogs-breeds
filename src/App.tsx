import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import Breeds from './routes/Breeds';
import Favorites from './routes/Favorites';
import Quiz from './routes/Quiz';
import './global.module.scss';
import Layout from './layout/Layout';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "breeds",
          element: <Breeds />
        },
        {
          path: "breeds/:breedName",
          element: <Breeds />
        },
        {
          path: "breeds/:breedName/:subBreedName",
          element: <Breeds />
        },
        {
          path: "favorites",
          element: <Favorites />
        },
        {
          path: "favorites/:breedName",
          element: <Favorites />
        },
        {
          path: "favorites/:breedName/:subBreedName",
          element: <Favorites />
        },
        {
          path: "quiz",
          element: <Quiz />
        }
      ]
    },
  ], { basename: process.env.PUBLIC_URL })
  return <RouterProvider router={router} />
}

export default App;
