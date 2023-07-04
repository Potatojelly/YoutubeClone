import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from './components/Root/Root';
import Home from './components/Home/Home';
import VideoSearchPage from './components/VideoSearchPage/VideoSearchPage';
import VideoDetail from './components/VideoDetail/VideoDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {index: true, element: <Home/>},
      {path: "/videos", element: <Home/>},
      {path: "/videos/search/:videoId", element: <VideoSearchPage/>},
      {path: "/videos/watch/:videoId", element: <VideoDetail/>},
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
