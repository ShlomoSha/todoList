import { Box, Button, CircularProgress, Link as MuiLink, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import AuthContainer from "./AuthContainer"
import AuthFormFields from "./AuthFormFields"
import { useAuthForm } from "../../hooks/useAuthForm"

export default function LoginForm() {
    const authForm = useAuthForm({ isLogin: true })

    return (
        <AuthContainer title="Login to your account">
            <Box component="form" onSubmit={authForm.handleSubmit}>
                <AuthFormFields
                    username={authForm.username}
                    setUsername={authForm.setUsername}
                    password={authForm.password}
                    setPassword={authForm.setPassword}
                    showPassword={authForm.showPassword}
                    setShowPassword={authForm.setShowPassword}
                    submitted={authForm.submitted}
                    isLogin={true}
                    clearError={authForm.clearError}
                />

                <Box sx={{ textAlign: 'center', margin: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Don't have account yet?{' '}
                        <MuiLink component={Link} to="/register" underline="hover">
                            sign up
                        </MuiLink>
                    </Typography>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={authForm.loading}
                    startIcon={authForm.loading ? <CircularProgress size={20} color="inherit" /> : null}
                    sx={{
                        mt: '15px',
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                    }}
                >
                    {authForm.loading ? 'Signing in...' : 'Sign in'}
                </Button>

                {authForm.error && (
                    <Typography variant="body2" align="center" color="error" sx={{ mt: 3 }}>
                        {authForm.error}
                    </Typography>
                )}
            </Box>
        </AuthContainer>
    )
}
