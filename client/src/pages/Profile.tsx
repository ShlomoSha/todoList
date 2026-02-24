import { Box, Paper, Typography, CircularProgress, Divider, Button, TextField, InputAdornment } from '@mui/material'
import { useUser, useUpdateProfile } from '../hooks/queries/useUser'
import { useTaskStats } from '../hooks/queries/useTasks'
import UserAvatar from '../components/UserAvatar'
import InfoField from '../components/InfoField'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { TrendingUpRounded, CheckCircleOutlineRounded, ScheduleRounded, EmojiEventsRounded, EditRounded, SaveRounded, CloseRounded, CheckCircleRounded, ErrorRounded } from '@mui/icons-material'
import { colors } from '../config/theme'
import { useState, useEffect } from 'react'
import { useFieldAvailability } from '../hooks/useFieldAvailability'
import { isValidEmail } from '../utils/validation/authForm.validation'

export default function Profile() {
  const { data: user, isLoading: userLoading, isError: userError } = useUser()
  const { data: stats, isLoading: statsLoading } = useTaskStats()
  const updateProfile = useUpdateProfile()

  const [isEditing, setIsEditing] = useState(false)
  const [editUsername, setEditUsername] = useState('')
  const [editEmail, setEditEmail] = useState('')

  useEffect(() => {
    if (user) {
      setEditUsername(user.username)
      setEditEmail(user.email)
    }
  }, [user])

  const { available: usernameAvailable, checking: checkingUsername } = useFieldAvailability({
    field: 'username',
    value: editUsername,
    enabled: isEditing && editUsername !== user?.username,
    excludeUserId: user?.id
  })

  const { available: emailAvailable, checking: checkingEmail } = useFieldAvailability({
    field: 'email',
    value: editEmail,
    enabled: isEditing && editEmail !== user?.email,
    excludeUserId: user?.id,
    customValidation: isValidEmail
  })

  if (userLoading || statsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (userError || !user) {
    return (
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography color="error">Error loading profile</Typography>
      </Box>
    )
  }

  const handleSave = async () => {
    const data: { username?: string, email?: string } = {}
    if (editUsername !== user.username) data.username = editUsername
    if (editEmail !== user.email) data.email = editEmail

    if (Object.keys(data).length === 0) {
      setIsEditing(false)
      return
    }

    try {
      await updateProfile.mutateAsync(data)
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to update profile', err)
    }
  }

  const handleCancel = () => {
    setEditUsername(user.username)
    setEditEmail(user.email)
    setIsEditing(false)
  }

  const isFormValid = () => {
    const usernameValid = editUsername === user.username || usernameAvailable === true
    const emailValid = editEmail === user.email || (isValidEmail(editEmail) && emailAvailable === true)
    return usernameValid && emailValid && !checkingUsername && !checkingEmail
  }

  const completionRate = stats?.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0

  const chartData = [
    { name: 'Completed', value: stats?.completed || 0, color: colors.green },
    { name: 'Pending', value: stats?.pending || 0, color: colors.orange },
  ]

  const renderValidationIcon = (checking: boolean, available: boolean | null, current: string, original: string) => {
    if (current === original) return null
    if (checking) return <CircularProgress size={20} />
    if (available === true) return <CheckCircleRounded color="success" sx={{ fontSize: 20 }} />
    if (available === false) return <ErrorRounded color="error" sx={{ fontSize: 20 }} />
    return null
  }

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 }, 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 2.5
    }}>
      {/* Page Header */}
      <Box>
        <Typography variant="h5" sx={{ 
          fontWeight: 800, 
          color: colors.primary,
          letterSpacing: '-0.5px',
          mb: 0.25
        }}>
          Profile
        </Typography>
      </Box>
      
      {/* Main Profile Card */}
      <Paper elevation={0} sx={{ 
        width: '100%',
        p: { xs: 2.5, md: 3 }, 
        borderRadius: '20px', 
        bgcolor: colors.white,
        border: `1px solid ${colors.border}`,
        boxShadow: '0 8px 24px rgba(104, 78, 57, 0.05)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 4 },
        alignItems: { xs: 'center', md: 'flex-start' }
      }}>
        
        {/* Left Side: Avatar */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 1.5,
          minWidth: 140,
        }}>
          <UserAvatar size={80} clickable={false} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: colors.primary, display: 'block', mb: 0.5 }}>
              Account Status
            </Typography>
            <Typography variant="caption" sx={{ 
              bgcolor: colors.completedCardBg, 
              color: colors.greenText, 
              px: 1.5, 
              py: 0.4, 
              borderRadius: '20px', 
              fontWeight: 600,
              display: 'inline-block'
            }}>
              Active User
            </Typography>
          </Box>
        </Box>

        {/* Right Side: Account Info */}
        <Box sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: colors.primary }}>
              Account Information
            </Typography>
            {isEditing && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  size="small" 
                  startIcon={<CloseRounded />} 
                  onClick={handleCancel}
                  sx={{ color: colors.secondary, textTransform: 'none', fontWeight: 600 }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  size="small" 
                  startIcon={updateProfile.isPending ? <CircularProgress size={16} color="inherit" /> : <SaveRounded />} 
                  disabled={!isFormValid() || updateProfile.isPending}
                  onClick={handleSave}
                  sx={{ 
                    bgcolor: colors.accent, 
                    '&:hover': { bgcolor: colors.accentDark },
                    textTransform: 'none', 
                    fontWeight: 700,
                    borderRadius: '8px'
                  }}
                >
                  {updateProfile.isPending ? 'Saving...' : 'Save'}
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, 
            gap: 2 
          }}>
            {isEditing ? (
              <>
                <Box>
                  <Typography variant="caption" sx={{ mb: 0.75, fontWeight: 700, color: colors.secondary, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '1px', display: 'block' }}>
                    Username
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    error={usernameAvailable === false}
                    helperText={usernameAvailable === false ? 'Username already taken' : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {renderValidationIcon(checkingUsername, usernameAvailable, editUsername, user.username)}
                        </InputAdornment>
                      ),
                      sx: { borderRadius: '12px', bgcolor: colors.fieldBg }
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ mb: 0.75, fontWeight: 700, color: colors.secondary, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '1px', display: 'block' }}>
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    error={emailAvailable === false || (editEmail !== user.email && !isValidEmail(editEmail))}
                    helperText={emailAvailable === false ? 'Email already in use' : (editEmail !== user.email && !isValidEmail(editEmail) ? 'Invalid email format' : '')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {renderValidationIcon(checkingEmail, emailAvailable, editEmail, user.email)}
                        </InputAdornment>
                      ),
                      sx: { borderRadius: '12px', bgcolor: colors.fieldBg }
                    }}
                  />
                </Box>
              </>
            ) : (
              <>
                <InfoField label="Username" value={user.username} />
                <InfoField label="Email Address" value={user.email} />
              </>
            )}
          </Box>

          <Divider sx={{ opacity: 0.6 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            <Box>
              <Typography variant="caption" sx={{ mb: 0.25, fontWeight: 700, color: colors.secondary, textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: '1px', display: 'block' }}>
                Member Since
              </Typography>
              <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 600 }}>
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
              </Typography>
            </Box>
            
            {!isEditing && (
              <Button 
                variant="contained" 
                size="small"
                startIcon={<EditRounded />}
                onClick={() => setIsEditing(true)}
                sx={{ 
                  bgcolor: colors.accent, 
                  px: 3, 
                  py: 1, 
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  boxShadow: '0 6px 16px rgba(200, 132, 90, 0.2)',
                  '&:hover': { bgcolor: colors.accentDark, transform: 'translateY(-1px)' },
                  transition: 'all 0.2s ease'
                }}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Dashboard Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: colors.primary, mb: 2, letterSpacing: '-0.5px' }}>
          Performance Dashboard
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' }, gap: 2.5 }}>
          {/* Stats Cards Column */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {[
              { label: 'Total Tasks',      value: stats?.total || 0,     icon: <TrendingUpRounded sx={{ color: colors.primary,   fontSize: 20 }} />, color: colors.totalCardBg },
              { label: 'Completed',        value: stats?.completed || 0, icon: <CheckCircleOutlineRounded sx={{ color: colors.greenText, fontSize: 20 }} />, color: colors.completedCardBg },
              { label: 'Pending',          value: stats?.pending || 0,   icon: <ScheduleRounded sx={{ color: colors.accent,   fontSize: 20 }} />, color: colors.pendingCardBg },
              { label: 'Completion Rate',  value: `${completionRate}%`,  icon: <EmojiEventsRounded sx={{ color: '#3b5bdb',   fontSize: 20 }} />, color: '#eef2ff' },
            ].map((item) => (
              <Paper key={item.label} elevation={0} sx={{ 
                p: 2, 
                borderRadius: '16px', 
                bgcolor: item.color, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                border: '1px solid rgba(0,0,0,0.03)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ p: 1, bgcolor: colors.white, borderRadius: '10px', display: 'flex' }}>
                    {item.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: colors.primary }}>{item.label}</Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: colors.primary }}>{item.value}</Typography>
              </Paper>
            ))}
          </Box>

          {/* Chart Card */}
          <Paper elevation={0} sx={{ 
            p: 2.5, 
            borderRadius: '20px', 
            bgcolor: colors.white, 
            border: `1px solid ${colors.border}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 220
          }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>Task Distribution</Typography>
            <Box sx={{ width: '100%', height: 200 }}>
              {stats?.total === 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>No data to display yet</Typography>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <filter id="shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
                      </filter>
                    </defs>
                    <Pie
                      data={chartData}
                      innerRadius={40}
                      outerRadius={90}
                      paddingAngle={0}
                      dataKey="value"
                      filter="url(#shadow)"
                      animationDuration={1200}
                    >
                      {chartData.map((entry, index) => ( 
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                      itemStyle={{ fontWeight: 600 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
              {chartData.map((item) => (
                <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '3px', bgcolor: item.color }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: colors.primary }}>
                    {item.name} ({item.value})
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}
