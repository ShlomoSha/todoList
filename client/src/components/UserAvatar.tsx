import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { taskEndpoint } from "../api/tasksService";
import { ROUTES } from "../routes/routes.constants";
import useLocalStorage from "../hooks/useLocalStorage";
import { stringToColor } from "../utils/stringToColor";

export default function UserAvatar() {
    const navigateTo = useNavigate()
    const { getUsername } = useLocalStorage()

    const username = getUsername()
    const firstLetter = username?.charAt(0).toUpperCase() ?? "?"
    const avatarColor = stringToColor(username ?? '')

  return (
    <IconButton onClick={ () => navigateTo(taskEndpoint(ROUTES.PROFILE)) }>
        <Avatar sx={{
          bgcolor: avatarColor,
          width: 34,
          height: 34,
          fontSize: "0.9rem",
          fontWeight: 700,
          border: "2px solid rgba(245,238,232,0.25)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}>
            {firstLetter}
        </Avatar>
    </IconButton>
  )
}
