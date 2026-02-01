import { Box, TextField } from "@mui/material"

interface authMode {
    mode: string
}

export default function AuthForm({mode}: authMode) {
    const isLogin: boolean = mode === 'login'

  return (
    <>
        <Box>
            <TextField id="input-username" label="username" variant="outlined" />
            <TextField id="input-password" label="password" variant="outlined" />
        </Box>
    </>
  )
}
