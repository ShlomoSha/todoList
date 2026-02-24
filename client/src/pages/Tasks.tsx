import { 
  Box, 
  Typography, 
  CircularProgress, 
  Paper, 
  TextField, 
  Button,
  Fade,
  Stack,
  IconButton
} from '@mui/material'
import { AssignmentRounded, RadioButtonUncheckedRounded, CheckCircleRounded, Add as AddIcon } from '@mui/icons-material'
import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useTasks, useTaskMutations } from '../hooks/queries/useTasks'
import { ROUTES } from '../routes/routes.constants'
import { colors } from '../config/theme'
import { TaskItem } from '../components/TaskItem'
import type { ITask } from '../types/tasks.interface'

export default function Tasks() {
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  
  const location = useLocation()
  const { data: tasks, isLoading, isError } = useTasks()
  const { createTask, isCreating } = useTaskMutations()

  const currentFilter = useMemo(() => {
    if (location.pathname.endsWith(ROUTES.PENDING)) return ROUTES.PENDING
    if (location.pathname.endsWith(ROUTES.DONE)) return ROUTES.DONE
    return ROUTES.ALL_TASKS
  }, [location.pathname])

  const filteredTasks = useMemo(() => {
    if (!tasks) return []
    if (currentFilter === ROUTES.PENDING) return tasks.filter((t: ITask) => !t.isCompleted)
    if (currentFilter === ROUTES.DONE) return tasks.filter((t: ITask) => t.isCompleted)
    return tasks
  }, [tasks, currentFilter])

  const pageInfo = useMemo(() => {
    switch (currentFilter) {
      case ROUTES.PENDING:
        return { title: 'Pending Tasks', icon: <RadioButtonUncheckedRounded sx={{ color: colors.accent }} /> }
      case ROUTES.DONE:
        return { title: 'Completed Tasks', icon: <CheckCircleRounded sx={{ color: colors.greenText }} /> }
      default:
        return { title: 'All Tasks', icon: <AssignmentRounded sx={{ color: colors.primary }} /> }
    }
  }, [currentFilter])

  // Auto-close form on navigation
  useMemo(() => {
    setIsExpanded(false)
    setNewTitle('')
    setNewDescription('')
  }, [currentFilter])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    await createTask({ title: newTitle, description: newDescription })
    setNewTitle('')
    setNewDescription('')
    setIsExpanded(false)
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress thickness={5} size={60} sx={{ color: colors.accent }} />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box sx={{ p: 10, textAlign: 'center' }}>
        <Typography color="error" variant="h5" sx={{ fontWeight: 700 }}>Error loading tasks.</Typography>
        <Typography color="text.secondary">Please check your connection and try again.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100%',
    }}>
      {/* 1. FIXED HEADER SECTION */}
      <Box sx={{ 
        px: { xs: 2.5, md: 4, lg: 6 }, 
        pt: { xs: 3, md: 4 }, 
        pb: 1.5,
        width: '100%',
        flexShrink: 0,
      }}>
        <Box sx={{ maxWidth: 900, mx: 'auto', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 1.5, display: 'flex', '& svg': { fontSize: '1.75rem' } }}>
              {pageInfo.icon}
            </Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 800, 
              color: colors.primary, 
              letterSpacing: '-0.5px' 
            }}>
              {pageInfo.title}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 2. SCROLLABLE CONTENT SECTION */}
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        px: { xs: 2.5, md: 4, lg: 6 },
        pb: 6,
        pt: 2, 
        scrollbarGutter: 'stable',
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { 
          background: 'rgba(0,0,0,0.05)', 
          borderRadius: '4px',
          '&:hover': { background: 'rgba(0,0,0,0.1)' }
        }
      }}>
        <Box sx={{ maxWidth: 900, mx: 'auto', width: '100%' }}>
          {/* Add Task Form */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 0,
              mb: 6, 
              borderRadius: '24px',
              border: `1.5px solid ${colors.border}`,
              bgcolor: colors.white,
              boxShadow: '0 8px 30px rgba(104, 78, 57, 0.05)',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: colors.accent,
                boxShadow: '0 12px 40px rgba(104, 78, 57, 0.12)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Box component="form" onSubmit={handleCreate} sx={{ p: isExpanded ? 3 : 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {!isExpanded && (
                  <IconButton 
                    type="submit" 
                    disabled={isCreating || !newTitle.trim()}
                    sx={{ 
                      color: colors.accent, 
                      ml: 0.5,
                      '&:hover': { bgcolor: `${colors.accent}12` },
                      '&.Mui-disabled': { color: 'text.disabled', opacity: 0.5 }
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                )}
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="What needs to be done?"
                  value={newTitle}
                  onFocus={() => setIsExpanded(true)}
                  onChange={(e) => setNewTitle(e.target.value)}
                  disabled={isCreating}
                  InputProps={{
                    disableUnderline: true,
                    sx: { 
                      fontSize: '1.15rem', 
                      fontWeight: 600, 
                      color: colors.primary,
                      py: 1.5,
                      px: isExpanded ? 0 : 1
                    }
                  }}
                />
                {!isExpanded && (
                  <Button 
                    variant="contained" 
                    type="submit" 
                    disabled={isCreating || !newTitle.trim()}
                    sx={{ 
                      bgcolor: colors.accent, 
                      px: 3.5,
                      py: 1,
                      mr: 1.25,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 800,
                      boxShadow: 'none',
                      '&:hover': { bgcolor: colors.accentDark, boxShadow: 'none' } 
                    }}
                  >
                    Add
                  </Button>
                )}
              </Box>

              {isExpanded && (
                <Fade in={isExpanded}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Add a detailed description..."
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      disabled={isCreating}
                      sx={{ 
                        '& .MuiOutlinedInput-root': { 
                          borderRadius: '16px',
                          bgcolor: 'rgba(104, 78, 57, 0.03)',
                          border: 'none',
                          '& fieldset': { border: 'none' }
                        } 
                      }}
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button 
                        onClick={() => { setIsExpanded(false); setNewTitle(''); setNewDescription('') }}
                        sx={{ fontWeight: 700, borderRadius: '12px', px: 3, color: 'text.secondary' }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="contained" 
                        type="submit" 
                        disabled={isCreating || !newTitle.trim()}
                        sx={{ 
                          bgcolor: colors.accent, 
                          px: 4,
                          py: 1.2,
                          borderRadius: '14px',
                          textTransform: 'none',
                          fontWeight: 800,
                          '&:hover': { bgcolor: colors.accentDark } 
                        }}
                      >
                        {isCreating ? 'Creating...' : 'Create Task'}
                      </Button>
                    </Stack>
                  </Box>
                </Fade>
              )}
            </Box>
          </Paper>

          {/* Task List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {filteredTasks.length === 0 ? (
              <Paper elevation={0} sx={{ 
                p: 10, 
                textAlign: 'center', 
                borderRadius: '32px', 
                border: `2px dashed ${colors.fieldBorder}`,
                bgcolor: 'transparent'
              }}>
                <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 700, mb: 1 }}>
                  No tasks found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ opacity: 0.7 }}>
                  {currentFilter === ROUTES.DONE ? "You haven't completed any tasks yet." : "Time to start being productive!"}
                </Typography>
              </Paper>
            ) : (
              filteredTasks.map((task: ITask) => (
                <Fade in key={task._id} timeout={400}>
                  <Box>
                    <TaskItem task={task} />
                  </Box>
                </Fade>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
