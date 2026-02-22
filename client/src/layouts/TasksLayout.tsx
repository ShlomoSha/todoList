import { AppBar, Box, IconButton, Toolbar } from "@mui/material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import UserAvatar from "../components/UserAvatar"
import { Logout } from "@mui/icons-material"

export default function TasksLayout() {
    const navigatTo = useNavigate()
    const location = useLocation()

  return (
    <Box>
        <AppBar position="fixed" sx={{ bgcolor: '#e8d8c9ff' }}>
            <Toolbar>
                <UserAvatar/>
            </Toolbar>
            <IconButton
                onClick={() => {}}
                size="small"
                sx={{
                  color: "#b89e8e",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "rgba(255,100,80,0.15)", color: "#ff8570" },
                  transition: "all 0.15s ease",
                }}
              >
                <Logout fontSize="small" />
              </IconButton>
        </AppBar>
        <Box>
            <Outlet />
        </Box>
    </Box>
  )
}