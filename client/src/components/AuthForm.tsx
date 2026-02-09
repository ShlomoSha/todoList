import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, Container, IconButton, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "../api/authService"
import { ROUTES, TOKEN, type AuthMode } from "../constants/constants"
interface authMode {
    mode: AuthMode
}

export default function AuthForm({mode}: authMode) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigateTo = useNavigate()

    const isLogin: boolean = mode === ROUTES.LOGIN

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setSubmitted(true)
        setError('')

        if (username === '' || password === '') {
            setError('Something is missing')
            setLoading(false)
            return
        }
        try {
            let response;

            if (isLogin) {
                response = await authService.login({username, password})
                localStorage.setItem(TOKEN, response.data.token)
            }
            else {
                response = await authService.register({username, password})
            }

            const destination = isLogin ? ROUTES.TASKS : ROUTES.LOGIN

            navigateTo(`/${destination}`)
        } catch (err: any) {
            setError(err.response?.data.message || `${isLogin ? 'Login' : 'Registration'} failed. Please try again.`)
            console.error(err.response?.data.message)
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <>
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
                        onChange={(e) => {
                            setUsername(e.target.value)
                            setError('')
                        }}
                        autoComplete="username"
                        autoFocus
                        error={submitted && username === ''}
                        helperText={submitted && username === '' ? 'username is required' : ''}
                        />
                    <TextField
                        fullWidth
                        label="password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) =>{
                            setPassword(e.target.value)
                            setError('')
                        }}
                        autoComplete={isLogin ? "current-password" : "new-password"}
                        error={submitted && password === ''}
                        helperText={submitted && password === '' ? 'password is required' : ''}
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
                        loading={loading}
                        sx={{
                            mt: '15px',
                            py: 1.5,
                            textTransform: 'none',
                            fontSize: '1.1rem',
                        }}
                        >
                        {isLogin ? "Sign in" : "Sign up"}
                    </Button>
                    {error && 
                        <Typography variant="body2" align="center" color="error" sx={{ mt: 3 }}>
                            {error}
                        </Typography>
                    }
                </Box>
            </Paper>
        </Container>
    </>
  )
}
