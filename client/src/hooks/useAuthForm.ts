import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService, { authEndpoint } from "../api/authService"
import { ROUTES } from "../routes/routes.constants"
import { useFieldAvailability } from "./useFieldAvailability"
import { isValidEmail } from "../utils/validation/authForm.validation"
import useLocalStorage from "./useLocalStorage"

interface UseAuthFormProps {
    isLogin: boolean
}

export function useAuthForm({ isLogin }: UseAuthFormProps) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { available: usernameAvailable, checking: checkingUsername } = useFieldAvailability({
        field: 'username',
        value: username,
        enabled: !isLogin
    })

    const { available: emailAvailable, checking: checkingEmail } = useFieldAvailability({
        field: 'email',
        value: email,
        enabled: !isLogin,
        customValidation: isValidEmail
    })

    const { addTokenLs, addUsernameLs } = useLocalStorage()

    const navigateTo = useNavigate()

    const validateForm = () => {
        if (username === '' || password === '') return false
        if (!isLogin && email === '') return false
        return true
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setSubmitted(true)
        setError('')

        if (!validateForm()) {
            setError('Something is missing')
            setLoading(false)
            return
        }

        try {
            if (isLogin) {
                const response = await authService.login({ username, password })
                addTokenLs(response.data.loginData.token)
                addUsernameLs(username)
                navigateTo(`/${ROUTES.TASKS}`)
            } else {
                await authService.register({ username, email, password })
                navigateTo(authEndpoint(ROUTES.LOGIN))
            }

        } catch (err: any) {
            setError(err.response?.data.message || 'Server Error. Please try again later.')
            console.error(err.response?.data.message)
        } finally {
            setLoading(false)
        }
    }

    const clearError = () => setError('')

    return {
        // Form state
        username,
        email,
        password,
        error,
        loading,
        submitted,
        showPassword,

        usernameAvailable,
        emailAvailable,
        checkingUsername,
        checkingEmail,
        
        // Setters
        setUsername,
        setEmail,
        setPassword,
        setShowPassword,
        
        // Actions
        handleSubmit,
        clearError,
    }
}
