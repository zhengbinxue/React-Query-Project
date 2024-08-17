import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Events from "./components/Events/Events.jsx";
import EventDetails from "./components/Events/EventDetails.jsx";
import NewEvent from "./components/Events/NewEvent.jsx";
import EditEvent from "./components/Events/EditEvent.jsx";

const router = createBrowserRouter([
  {
    //when the route changes completely such as '/home' navigate to 'about',
    //the current component will be un-mount and the new component will be rendered
    path: "/",
    element: <Navigate to="/events" />,
  },
  {
    //Navigating from a child route to a parent route will re-render the
    //parent route's component and unmount the child route's component.

    path: "/events",
    element: <Events />,
    //Navigating from a parent route to a child route will not
    //re- render the parent route's component, but will mount the
    //child route's component and pass the parent route's state as a prop.
    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
      },
    ],
  },
]);

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
