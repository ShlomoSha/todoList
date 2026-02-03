import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, Container, IconButton, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"

interface authMode {
    mode: string
}

export default function AuthForm({mode}: authMode) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const isLogin: boolean = mode === 'login'

    const handleSubmit = async () => {}

  return (
    <>
        <Box sx={{
        height: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5eee8ff"
        }}>
            <Container maxWidth="sm" >
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                        Welcom To TodoList
                    </Typography>
                </Box>
                <Paper elevation={6} sx={{
                    p: 4,
                    borderRadius: 3,
                }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Typography variant="h6" component="h1" gutterBottom>
                            {isLogin ? "Login to your account" : "Register to TodoList"}
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="username"
                            type="text"
                            variant="outlined"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            autoFocus
                            />
                        <TextField
                            fullWidth
                            label="password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete={isLogin ? "current-password" : "new-password"}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                >
                                                { showPassword ? <VisibilityOff /> : <Visibility/> }
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                            />
                        <Box sx={{textAlign: 'center', margin: 1, }}>
                            <Typography variant="body2" color="text.secondary">
                                {isLogin ? "Don't have account yet? " : "Back to "}
                                <Link href={isLogin ? 'register' : 'login'} underline="hover" >
                                    {isLogin ? "sing up" : "login"}
                                </Link>
                            </Typography>
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                marginTop: '15px',
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1.1rem',
                            }}
                            >
                            {isLogin ? "sing in" : "sing up"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    </>
  )
}
