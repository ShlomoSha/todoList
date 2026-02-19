import { AnimatePresence, motion } from "framer-motion"
import { Box, Button, Stack } from "@mui/material"
import { useLocation, useNavigate, useOutlet } from "react-router-dom"
import { ROUTES } from "../routes/routes.constants"
import { authEndpoint } from "../api/authService"

export default function AuthLayout() {
    const navigateTo = useNavigate()
    const location = useLocation()
    const outlet = useOutlet()
    
    const isLoginPage = location.pathname === `${authEndpoint(ROUTES.LOGIN)}`
    const isRegisterPage = location.pathname === `${authEndpoint(ROUTES.REGISTER)}`
    
    return (
        <Box 
            width="100%" 
            height="100%"
            position="relative"
            sx={{ overflow: 'hidden' }}
        >
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    zIndex: 10
                }}
            >
                <Button
                    variant={isLoginPage ? "contained" : "outlined"}
                    onClick={() => navigateTo(`/${ROUTES.AUTH}/${ROUTES.LOGIN}`)}
                    sx={{
                        minWidth: 100,
                        fontWeight: isLoginPage ? 'bold' : 'normal',
                        borderColor: isLoginPage ? undefined : 'primary.main',
                        color: isLoginPage ? undefined : 'primary.main',
                    }}
                >
                    Login
                </Button>
                <Button
                    variant={!isLoginPage && isRegisterPage ? "contained" : "outlined"}
                    onClick={() => navigateTo(`/${ROUTES.AUTH}/${ROUTES.REGISTER}`)}
                    sx={{
                        minWidth: 100,
                        fontWeight: !isLoginPage && isRegisterPage ? 'bold' : 'normal',
                        borderColor: !isLoginPage && isRegisterPage ? undefined : 'primary.main',
                        color: !isLoginPage ? undefined : 'primary.main',
                    }}
                >
                    Register
                </Button>
            </Stack>

            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}
            >
                <AnimatePresence mode="wait">
                    {outlet && (
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {outlet}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </Box>
    )
}