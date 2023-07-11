import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from './components/Root/Root';
import Home from './pages/Home/Home';
import VideoSearchPage from "./pages/VideoSearchPage/VideoSearchPage";
import VideoWatchPage from "./pages/VideoWatchPage/VideoWatchPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {index: true, element: <Home/>},
      {path: "/videos/", element: <Home/>},
      {path: "/videos/search/:keyword", element: <VideoSearchPage/>},
      {path: "/videos/watch/:videoId", element: <VideoWatchPage/>},
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
