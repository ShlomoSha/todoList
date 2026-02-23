import { Box, Typography } from '@mui/material'
import { colors } from '../config/theme'

interface InfoFieldProps {
  label: string
  value: string
}

export default function InfoField({ label, value }: InfoFieldProps) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          mb: 0.75,
          fontWeight: 700,
          color: colors.secondary,
          textTransform: 'uppercase',
          fontSize: '0.65rem',
          letterSpacing: '1px',
          display: 'block',
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          p: 1.5,
          borderRadius: '12px',
          border: `1.5px solid ${colors.fieldBorder}`,
          bgcolor: colors.fieldBg,
          '&:hover': {
            borderColor: colors.accent,
            bgcolor: colors.white,
            boxShadow: '0 4px 12px rgba(200, 132, 90, 0.08)',
          },
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary }}>
          {value}
        </Typography>
      </Box>
    </Box>
  )
}
