import { Box, Button, Chip, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import UserAvatar from "../components/UserAvatar"
import SIDEBAR_ITEMS from "../config/sidebarItems";
import BADGE_COLORS from "../config/badges";
import useLocalStorage from "../hooks/useLocalStorage";
import { Logout } from "@mui/icons-material";
import { ROUTES } from "../routes/routes.constants";
import { taskEndpoint } from "../api/tasksService";

const SIDEBAR_WIDTH = 248;

export default function TasksLayout() {
    const navigateTo = useNavigate()
    const location = useLocation()
    const { deleteToken, getUsername, deleteUsernameLs } = useLocalStorage()

    const isActive = (path: string) => {
      if (path === taskEndpoint(ROUTES.TASKS)) return location.pathname === taskEndpoint(ROUTES.TASKS);
      return location.pathname.startsWith(path);
    };

    const logout = async () => {
      deleteToken()
      deleteUsernameLs()
      navigateTo('/')
    }

  return (
    <Box>
      <Drawer variant="permanent" anchor="left" sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          bgcolor: "#faf6f2",
          borderRight: "1px solid #e8ddd4",
          borderLeft: "none",
          display: "flex",
          flexDirection: "column",
          py: 2.5,
          px: 1.5,
          boxShadow: "-2px 0 16px rgba(180,140,100,0.08)",
        },
      }}>
        <Box sx={{ px: 1.5, pb: 2.5, mb: 0.5 }}>
          <Typography
            sx={{
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 800,
              fontSize: "20px",
              color: "#684e39ff",
              letterSpacing: "-0.5px",
            }}
          >
            TodoList
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#e8ddd4", mb: 2 }} />

        <List sx={{ display: "flex", flexDirection: "column", gap: 0.5, p: 0 }}>
          {SIDEBAR_ITEMS.map((item) => {
            const active = isActive(item.path);
            const badgeCount = null;
            const badgeStyle = item.badgeKey ? BADGE_COLORS[item.badgeKey] : null;

            return (
              <ListItemButton
                key={item.path}
                onClick={() => navigateTo(item.path)}
                sx={{
                  borderRadius: "10px",
                  py: 1,
                  px: 1.5,
                  position: "relative",
                  bgcolor: active ? "#efe4d9" : "transparent",
                  color: active ? "#7a5c44" : "#a08068",
                  transition: "all 0.18s ease",
                  "&:hover": {
                    bgcolor: active ? "#efe4d9" : "#f0e8df",
                    color: "#7a5c44",
                  },
                  // Active indicator bar (on the left in RTL = right side)
                  "&::after": active
                    ? {
                        content: '""',
                        position: "absolute",
                        right: 0,
                        top: "20%",
                        height: "60%",
                        width: "3px",
                        bgcolor: "#c8845a",
                        borderRadius: "3px 0 0 3px",
                      }
                    : {},
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{
                      fontFamily: "'Heebo', sans-serif", fontWeight: active ? 600 : 500, fontSize: "14px"
                    }}>
                      {item.label}
                    </Typography>
                  }
                />
                {badgeCount !== null && badgeStyle && (
                  <Chip
                    label={badgeCount}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "11px",
                      fontWeight: 700,
                      bgcolor: badgeStyle.bg,
                      color: badgeStyle.color,
                      "& .MuiChip-label": { px: "6px" },
                      minWidth: 28,
                    }}
                  />
                )}
              </ListItemButton>
            );
          })}
        </List>

        <Box sx={{ display: "flex", flexDirection: "column", mt: "auto" }}>

          <Divider sx={{ borderColor: "#e8ddd4", mb: 2 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
              <UserAvatar />
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#5c3d26",
                  lineHeight: 1.3,
                }}
                >
                {getUsername()}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: "11px",
                  color: "#b09070",
                }}
                >
                Tasks manager
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ borderColor: "#e8ddd4", mt: 2, mb: 3 }} />
          
        <Button
          onClick={logout}
          startIcon={<Logout />}
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "15px",
            borderRadius: "10px",
            bgcolor: "#f0cbc5ff",
            color: "#836650ff",
            "&:hover": {
              bgcolor: "#efb59dff",
              color: "#684e39",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>

      <Box>
          <Outlet />
      </Box>
    </Box>
  )
}