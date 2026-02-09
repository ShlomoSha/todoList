import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
         <Box sx={{
            height: '100%',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f5eee8ff"
        }}>
            <Outlet />
        </Box>
    </>
  )
}
