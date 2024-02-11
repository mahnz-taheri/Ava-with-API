
import './App.css';
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const Home = lazy(() => import("./pages/GoftarPage"));
const Archive = lazy(() => import("./pages/ArchivePage"));


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<LinearProgress color='success' />}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/archive",
      element: (
        <Suspense fallback={<LinearProgress color='success' />}>
          <Archive />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;


