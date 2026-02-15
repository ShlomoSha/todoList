import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { createRoutes } from "./routes/routesFactory"
import appRoute from "./routes/app.routes"

function App() {

  const router = createBrowserRouter(
    createRoutes(appRoute)
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
