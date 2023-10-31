// App.tsx

import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewTicketForm from "./components/NewTicketForm";
import AdminPanel from "./components/AdminPanel";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NewTicketForm />,
    },
    {
      path: "/admin",
      element: <AdminPanel />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
