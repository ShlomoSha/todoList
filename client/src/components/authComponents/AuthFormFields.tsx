import { Cancel, CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material"
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

    צריך לאחד את הפונקציות
    לשים את השגיאה בצבע אדום
    ולבדוק אם אחנו רוצים את הסימונים האלה
    .length < 3 האם אניחנו רוצים כזה דבר

     const getUsernameEndAdornment = () => {
        if (isLogin || username.length < 3) return null
        
        if (checkingUsername) {
            return (
                <InputAdornment position="end">
                    <CircularProgress size={20} />
                </InputAdornment>
            )
        }
        
        if (usernameAvailable === true) {
            return (
                <InputAdornment position="end">
                    <CheckCircle color="success" />
                </InputAdornment>
            )
        }
        
        if (usernameAvailable === false) {
            return (
                <InputAdornment position="end">
                    <Cancel color="error" />
                </InputAdornment>
            )
        }
        
        return null
    }
    
    const getEmailEndAdornment = () => {
        if (isLogin || !email || email.length < 3 || !email.includes('@')) return null
        
        if (checkingEmail) {
            return (
                <InputAdornment position="end">
                    <CircularProgress size={20} />
                </InputAdornment>
            )
        }
        
        if (emailAvailable === true) {
            return (
                <InputAdornment position="end">
                    <CheckCircle color="success" />
                </InputAdornment>
            )
        }
        
        if (emailAvailable === false) {
            return (
                <InputAdornment position="end">
                    <Cancel color="error" />
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
                        endAdornment: getUsernameEndAdornment()
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
                            endAdornment: getEmailEndAdornment()
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
