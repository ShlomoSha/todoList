import { Box } from "@mui/material";
import AuthForm from "../components/AuthForm";

export default function Login() {
  return (
    <>
      <Box sx={{
        height: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#d70808ff"
      }}>
        <AuthForm mode="login"/>
      </Box>
    </>
  )
}
