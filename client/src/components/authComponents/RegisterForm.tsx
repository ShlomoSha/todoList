import { Box, Button, CircularProgress, Typography } from "@mui/material"
import AuthContainer from "./AuthContainer"
import AuthFormFields from "./AuthFormFields"
import { useAuthForm } from "../../hooks/useAuthForm"

export default function RegisterForm() {
    const authForm = useAuthForm({ isLogin: false })

    return (
        <AuthContainer title="Register to TodoList">
            <Box component="form" onSubmit={authForm.handleSubmit}>
                <AuthFormFields
                    username={authForm.username}
                    setUsername={authForm.setUsername}
                    email={authForm.email}
                    setEmail={authForm.setEmail}
                    password={authForm.password}
                    setPassword={authForm.setPassword}
                    showPassword={authForm.showPassword}
                    setShowPassword={authForm.setShowPassword}
                    submitted={authForm.submitted}
                    isLogin={false}
                    clearError={authForm.clearError}
                />

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
                    {authForm.loading ? 'Creating account...' : 'Sign up'}
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
