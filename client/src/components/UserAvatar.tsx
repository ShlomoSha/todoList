import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { taskEndpoint } from "../api/tasksService";
import { ROUTES } from "../routes/routes.constants";
import useLocalStorage from "../hooks/useLocalStorage";
import { stringToColor } from "../utils/stringToColor";
import { useUser } from "../hooks/queries/useUser";

interface UserAvatarProps {
    size?: number;
    clickable?: boolean;
}

export default function UserAvatar({ size = 34, clickable = true }: UserAvatarProps) {
    const navigateTo = useNavigate()
    const { getUsername } = useLocalStorage()
    const { data: user } = useUser()

    const username = user?.username || getUsername()
    const firstLetter = username?.charAt(0).toUpperCase() ?? "?"
    const avatarColor = stringToColor(username ?? '')

    const avatarComponent = (
        <Avatar sx={{
            bgcolor: avatarColor,
            width: size,
            height: size,
            fontSize: size > 40 ? "1.8rem" : "0.9rem", // Adaptive font size for now or calculated
            fontWeight: 700,
            border: "2px solid rgba(245,238,232,0.25)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            ...(clickable && {
                "&:hover": {
                    transform: "scale(1.1)",
                },
            }),
        }}>
            {firstLetter}
        </Avatar>
    )

    if (!clickable) return avatarComponent

    return (
        <IconButton onClick={ () => navigateTo(taskEndpoint(ROUTES.PROFILE)) } sx={{ p: 0 }}>
            {avatarComponent}
        </IconButton>
    )
}
