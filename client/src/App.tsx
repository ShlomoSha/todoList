import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Tasks from "./pages/Tasks"
import AppLayout from "./layouts/AppLayout"
import AuthLayout from "./layouts/AuthLayout"

function App() {

  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/'element={<Navigate to={'login'} />} />
          <Route element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='tasks' element={<Tasks />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
