import { Check, Close, Visibility, VisibilityOff } from "@mui/icons-material"
import { CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material"

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
    usernameAvailable?: boolean | null
    emailAvailable?: boolean | null
    checkingUsername?: boolean
    checkingEmail?: boolean
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
    usernameAvailable,
    emailAvailable,
    checkingUsername,
    checkingEmail,
}: AuthFormFieldsProps) {

    const getFieldEndAdornment = (checkingField: boolean | undefined, valueAvailable: boolean | null | undefined) => {
        if (isLogin) return null
        
        if (checkingField) {
            return (
                <InputAdornment position="end">
                    <CircularProgress size={20} />
                </InputAdornment>
            )
        }
        
        if (valueAvailable === true) {
            return (
                <InputAdornment position="end">
                    <Check color="success" />
                </InputAdornment>
            )
        }
        
        if (valueAvailable === false) {
            return (
                <InputAdornment position="end">
                    <Close color="error" />
                </InputAdornment>
            )
        }
        
        return null
    }
    
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
                error={submitted && (username === '' || (!isLogin && usernameAvailable === false))}
                helperText={
                    submitted && username === '' ? 'username is required' :
                     !isLogin && usernameAvailable === false 
                    ? 'Username already taken' : ''
                }
                slotProps={{
                    input: {
                        endAdornment: getFieldEndAdornment(checkingUsername, usernameAvailable)
                    }
                }}
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
                    helperText={
                        submitted && email === '' 
                            ? 'email is required' 
                            : emailAvailable === false 
                            ? 'Email already registered' 
                            : ''
                    }
                    slotProps={{
                        input: {
                            endAdornment: getFieldEndAdornment(checkingEmail, emailAvailable)
                        }
                    }}
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
