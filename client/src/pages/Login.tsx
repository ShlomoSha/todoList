import AuthForm from "../components/AuthForm";
import { ROUTES } from "../constants/constants";

export default function Login() {

  return (
    <>
        <AuthForm mode={`${ROUTES.LOGIN}`}/>
    </>
  )
}
