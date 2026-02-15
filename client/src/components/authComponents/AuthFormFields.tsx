import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"

interface AuthFormFieldsProps {
    username: string
    setUsername: (value: string) => void
    password: string
    setPassword: (value: string) => void
    email?: string
    setEmail?: (value: string) => void
    showPassword: boolean
    setShowPassword: (value: boolean) => void
    submitted: boolean
    isLogin: boolean
    clearError: () => void
}

export default function AuthFormFields({
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    submitted,
    isLogin,
    clearError,
}: AuthFormFieldsProps) {
    return (
        <>
            <TextField
                fullWidth
                label="Username"
                type="text"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                    clearError()
                }}
                autoComplete="username"
                autoFocus
                error={submitted && username === ''}
                helperText={submitted && username === '' ? 'username is required' : ''}
            />
            
            {!isLogin && setEmail && (
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        clearError()
                    }}
                    autoComplete="email"
                    error={submitted && email === ''}
                    helperText={submitted && email === '' ? 'email is required' : ''}
                />
            )}
            
            <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                    clearError()
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
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />
        </>
    )
}
