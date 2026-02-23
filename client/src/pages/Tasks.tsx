import { 
  Box, 
  Typography, 
  CircularProgress, 
  Paper, 
  ListItemText, 
  Checkbox, 
  IconButton, 
  TextField, 
  Button,
  Fade
} from '@mui/material'
import { Delete as DeleteIcon, AssignmentRounded, RadioButtonUncheckedRounded, CheckCircleRounded } from '@mui/icons-material'
import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useTasks, useTaskMutations } from '../hooks/queries/useTasks'
import { ROUTES } from '../routes/routes.constants'
import { colors } from '../config/theme'

export default function Tasks() {
  const [newTitle, setNewTitle] = useState('')
  const location = useLocation()
  const { data: tasks, isLoading, isError } = useTasks()
  const { createTask, toggleTask, deleteTask, isCreating } = useTaskMutations()

  const currentFilter = useMemo(() => {
    if (location.pathname.endsWith(ROUTES.PENDING)) return ROUTES.PENDING
    if (location.pathname.endsWith(ROUTES.DONE)) return ROUTES.DONE
    return ROUTES.ALL_TASKS
  }, [location.pathname])

  const filteredTasks = useMemo(() => {
    if (!tasks) return []
    if (currentFilter === ROUTES.PENDING) return tasks.filter((t: any) => !t.isCompleted)
    if (currentFilter === ROUTES.DONE) return tasks.filter((t: any) => t.isCompleted)
    return tasks
  }, [tasks, currentFilter])

  const pageInfo = useMemo(() => {
    switch (currentFilter) {
      case ROUTES.PENDING:
        return { title: 'Pending Tasks', icon: <RadioButtonUncheckedRounded sx={{ mr: 1.5, color: colors.accent }} /> }
      case ROUTES.DONE:
        return { title: 'Completed Tasks', icon: <CheckCircleRounded sx={{ mr: 1.5, color: colors.greenText }} /> }
      default:
        return { title: 'All Tasks', icon: <AssignmentRounded sx={{ mr: 1.5, color: colors.primary }} /> }
    }
  }, [currentFilter])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    await createTask({ title: newTitle })
    setNewTitle('')
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography color="error">Error loading tasks. Please try again.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 3, md: 5, lg: 8 }, maxWidth: 1000, mx: 'auto', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
        {pageInfo.icon}
        <Typography variant="h3" sx={{ fontWeight: 800, color: colors.primary, letterSpacing: '-1px' }}>
          {pageInfo.title}
        </Typography>
      </Box>

      {/* Add Task Form */}
      <Paper 
        component="form" 
        onSubmit={handleCreate}
        elevation={0}
        sx={{ 
          p: 1.5, 
          pl: 3,
          mb: 6, 
          display: 'flex', 
          gap: 2, 
          borderRadius: '20px',
          border: `1px solid ${colors.border}`,
          bgcolor: colors.white,
          boxShadow: '0 10px 30px rgba(104, 78, 57, 0.05)'
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder="Add a new task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={isCreating}
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: '1.1rem', fontWeight: 500 }
          }}
        />
        <Button 
          variant="contained" 
          type="submit" 
          disabled={isCreating || !newTitle.trim()}
          sx={{ 
            bgcolor: colors.accent, 
            px: 4,
            borderRadius: '14px',
            textTransform: 'none',
            fontWeight: 700,
            '&:hover': { bgcolor: colors.accentDark } 
          }}
        >
          {isCreating ? 'Adding...' : 'Add Task'}
        </Button>
      </Paper>

      {/* Task List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredTasks.length === 0 ? (
          <Paper elevation={0} sx={{ 
            p: 8, 
            textAlign: 'center', 
            borderRadius: '24px', 
            border: `2px dashed ${colors.fieldBorder}`,
            bgcolor: 'transparent'
          }}>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
              {currentFilter === ROUTES.DONE ? "You haven't completed any tasks yet." : "No tasks found. Time to add some!"}
            </Typography>
          </Paper>
        ) : (
          filteredTasks.map((task: any) => (
            <Fade in key={task._id} timeout={400}>
              <Paper 
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '18px',
                  border: `1px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    borderColor: colors.accent,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(104, 78, 57, 0.06)'
                  },
                  bgcolor: task.isCompleted ? colors.completedRowBg : colors.white
                }}
              >
                <Checkbox
                  checked={task.isCompleted}
                  onChange={() => toggleTask(task._id)}
                  sx={{ 
                    color: colors.accent,
                    '&.Mui-checked': { color: colors.greenText }
                  }}
                />
                <ListItemText 
                  primary={
                    <Typography sx={{ 
                      fontWeight: 600, 
                      fontSize: '1.1rem',
                      color: task.isCompleted ? 'text.secondary' : colors.primary,
                      textDecoration: task.isCompleted ? 'line-through' : 'none'
                    }}>
                      {task.title}
                    </Typography>
                  }
                  secondary={task.description}
                />
                <IconButton edge="end" onClick={() => deleteTask(task._id)} sx={{ color: colors.danger }}>
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </Fade>
          ))
        )}
      </Box>
    </Box>
  )
}
