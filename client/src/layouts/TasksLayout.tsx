import { Box, Button, Chip, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import UserAvatar from "../components/UserAvatar"
import SIDEBAR_ITEMS from "../config/sidebarItems";
import BADGE_COLORS from "../config/badges";
import useLocalStorage from "../hooks/useLocalStorage";
import { Logout } from "@mui/icons-material";
import { colors } from "../config/theme";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../hooks/queries/useUser";

const SIDEBAR_WIDTH = 248;

export default function TasksLayout() {
    const navigateTo = useNavigate()
    const location = useLocation()
    const { deleteToken, getUsername, deleteUsernameLs } = useLocalStorage()
    const queryClient = useQueryClient()
    const { data: user } = useUser()

    const isActive = (path: string) => {
      return location.pathname === path;
    };

    const logout = async () => {
      deleteToken()
      deleteUsernameLs()
      queryClient.clear()
      navigateTo('/')
    }

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100%', 
      overflow: 'hidden',
    }}>
      <Drawer variant="permanent" anchor="left" sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          bgcolor: colors.sidebarBg,
          borderRight: `1px solid ${colors.border}`,
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
              color: colors.primaryLight,
              letterSpacing: "-0.5px",
            }}
          >
            TodoList
          </Typography>
        </Box>

        <Divider sx={{ borderColor: colors.border, mb: 2 }} />

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
                  bgcolor: active ? colors.fieldBorder : "transparent",
                  color: active ? colors.sidebarActive : colors.sidebarInactive,
                  transition: "all 0.18s ease",
                  "&:hover": {
                    bgcolor: active ? colors.fieldBorder : colors.sidebarHover,
                    color: colors.sidebarActive,
                  },
                  "&::after": active
                    ? {
                        content: '""',
                        position: "absolute",
                        right: 0,
                        top: "20%",
                        height: "60%",
                        width: "3px",
                        bgcolor: colors.accent,
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
          <Divider sx={{ borderColor: colors.border, mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <UserAvatar />
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: colors.primary,
                  lineHeight: 1.3,
                }}
                >
                {user?.username || getUsername()}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: "11px",
                  color: colors.sidebarSubLabel,
                }}
                >
                Tasks manager
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ borderColor: colors.border, mt: 2, mb: 3 }} />
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
            bgcolor: colors.logoutBg,
            color: colors.logoutText,
            "&:hover": {
              bgcolor: colors.logoutHoverBg,
              color: colors.logoutHoverText,
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>

      <Box component="main" sx={{ 
        flexGrow: 1, 
        height: '100vh', 
        overflow: 'hidden', // Page-level scroll is handled inside children
      }}>
          <Outlet />
      </Box>
    </Box>
  )
}