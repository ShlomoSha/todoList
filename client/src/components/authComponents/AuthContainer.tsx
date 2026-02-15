import { Box, Container, Paper, Typography } from "@mui/material"
import type { ReactNode } from "react"

interface AuthContainerProps {
    title: string
    children: ReactNode
}

export default function AuthContainer({ title, children }: AuthContainerProps) {
    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                    Welcome To TodoList
                </Typography>
            </Box>
            <Paper elevation={6} sx={{
                p: 4,
                borderRadius: 3,
            }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h1" gutterBottom>
                        {title}
                    </Typography>
                </Box>
                {children}
            </Paper>
        </Container>
    )
}
