import { useEffect, useState } from "react"
import authService from "../api/authService"

interface UseFieldAvailabilityOptions {
    field: 'username' | 'email'
    value: string
    enabled: boolean 
    minLength?: number
    customValidation?: (value: string) => boolean
    debounceMs?: number
}

export const useFieldAvailability = ({
    field,
    value,
    enabled,
    minLength = 1,
    customValidation,
    debounceMs = 500
}: UseFieldAvailabilityOptions) => {
    const [available, setAvailable] = useState<boolean | null>(null)
    const [checking, setChecking] = useState(false)

     useEffect(() => {
        if (!enabled || value.length < minLength) {
            setAvailable(null)
            return
        }

        if (customValidation && !customValidation(value)) {
            setAvailable(null)
            return
        }

        setChecking(true)
        
        const timeoutId = setTimeout(async () => {
            try {
                const checkData = { [field]: value }
                const response = await authService.checkAvailability(checkData)
                setAvailable(response.data.available)
            } catch (err) {
                console.error(`Error checking ${field}:`, err)
                setAvailable(null)
            } finally {
                setChecking(false)
            }
        }, debounceMs)

        return () => clearTimeout(timeoutId)
    }, [value, enabled, field, minLength, debounceMs])

    return { available, checking }
}