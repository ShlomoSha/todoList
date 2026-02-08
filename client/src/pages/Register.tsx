import AuthForm from "../components/AuthForm";
import { ROUTES } from "../constants/constants";

export default function Register() {

  return (
    <>
      <AuthForm mode={`${ROUTES.REGISTER}`} />
    </>
  )
}
