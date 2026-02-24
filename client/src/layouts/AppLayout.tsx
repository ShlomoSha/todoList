import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <Box sx={{
        height: '100%',
        width: '100%',
        display: "flex",
        bgcolor: "#f9f4efff",
        overflow: "hidden",
    }}>
        <Outlet />
    </Box>
  )
}
