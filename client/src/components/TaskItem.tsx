import { 
  Paper, 
  Typography, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Checkbox,
  Tooltip,
  Chip,
  Collapse
} from '@mui/material'
import { 
  MoreVert as MoreVertIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material'
import { useState } from 'react'
import type { ITask } from '../types/tasks.interface'
import { useTaskMutations } from '../hooks/queries/useTasks'
import { colors } from '../config/theme'

interface TaskItemProps {
  task: ITask
}

const DESCRIPTION_CHAR_LIMIT = 120

export const TaskItem = ({ task }: TaskItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')
  const [isDescExpanded, setIsDescExpanded] = useState(false)
  
  const { updateTask, deleteTask, toggleTask } = useTaskMutations()

  const isLongDesc = (task.description?.length ?? 0) > DESCRIPTION_CHAR_LIMIT

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEditOpen = () => {
    handleMenuClose()
    setIsEditDialogOpen(true)
  }

  const handleDeleteOpen = () => {
    handleMenuClose()
    setIsDeleteDialogOpen(true)
  }

  const handleUpdate = async () => {
    await updateTask({ 
      id: task._id, 
      updates: { title: editTitle, description: editDescription } 
    })
    setIsEditDialogOpen(false)
  }

  const handleToggle = async () => {
    await toggleTask(task._id)
  }

  const handleDelete = async () => {
    await deleteTask(task._id)
    setIsDeleteDialogOpen(false)
  }

  const formattedDate = new Intl.DateTimeFormat('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(task.createdAt))

  return (
    <Paper 
      elevation={0}
      sx={{
        px: 2.5,
        py: 1.5, 
        borderRadius: '16px',
        border: `1.5px solid ${task.isCompleted ? colors.border + 'cc' : colors.border}`,
        display: 'flex',
        alignItems: 'center', 
        gap: 1.25,
        transition: 'all 0.22s ease',
        '&:hover': { 
          borderColor: colors.accent,
          transform: 'translateY(-1px)',
          boxShadow: '0 6px 24px rgba(104, 78, 57, 0.08)'
        },
        bgcolor: task.isCompleted ? '#f9f5f2' : colors.white,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: '20%',
          bottom: '20%',
          width: '3.5px',
          borderRadius: '0 4px 4px 0',
          bgcolor: task.isCompleted ? 'transparent' : colors.accent,
          opacity: task.isCompleted ? 0 : 0.6,
          transition: 'opacity 0.22s ease'
        },
        '&:hover::before': {
          opacity: task.isCompleted ? 0 : 1
        }
      }}
    >
      <Tooltip title={task.isCompleted ? "Mark as pending" : "Mark as completed"}>
        <Checkbox
          checked={task.isCompleted}
          onChange={handleToggle}
          sx={{ 
            p: 0.5,
            m: 0,
            color: colors.accent,
            '&.Mui-checked': { color: colors.greenText }
          }}
        />
      </Tooltip>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0, justifyContent: 'center' }}>
        {/* Title row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', minHeight: 40 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              fontSize: '1rem',
              color: task.isCompleted ? 'text.secondary' : colors.primary,
              textDecoration: task.isCompleted ? 'line-through' : 'none',
              lineHeight: 1.1, 
              margin: 0,
              padding: 0,
              wordBreak: 'break-word',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {task.title}
          </Typography>

          {/* Date as a subtle chip */}
          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: '0.75rem !important' }} />}
            label={formattedDate}
            size="small"
            variant="outlined"
            sx={{
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'text.secondary',
              borderColor: colors.border,
              bgcolor: 'transparent',
              '& .MuiChip-label': { px: 1 },
              '& .MuiChip-icon': { color: 'text.disabled', ml: 0.75 }
            }}
          />

          {task.isCompleted && (
            <Chip
              label="Completed"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 700,
                bgcolor: `${colors.greenText}18`,
                color: colors.greenText,
                '& .MuiChip-label': { px: 1 }
              }}
            />
          )}
        </Box>

        {/* Description with expand/collapse */}
        {task.description && (
          <Box sx={{ mt: 0.5 }}>
            <Collapse in={isDescExpanded} collapsedSize={isLongDesc ? 40 : 'auto'}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  opacity: task.isCompleted ? 0.55 : 0.75,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  ...(isDescExpanded && {
                    maxHeight: 140,
                    overflowY: 'auto',
                    pr: 0.5,
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': { width: 4 },
                    '&::-webkit-scrollbar-thumb': { borderRadius: 4, bgcolor: colors.border }
                  }),
                  ...(!isDescExpanded && isLongDesc && {
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  })
                }}
              >
                {task.description}
              </Typography>
            </Collapse>

            {isLongDesc && (
              <Box
                component="button"
                onClick={() => setIsDescExpanded(p => !p)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.3,
                  mt: 0.25,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.accent,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  p: 0,
                  '&:hover': { opacity: 0.75 }
                }}
              >
                {isDescExpanded ? (
                  <><ExpandLessIcon sx={{ fontSize: '0.9rem' }} /> Show less</>
                ) : (
                  <><ExpandMoreIcon sx={{ fontSize: '0.9rem' }} /> Show more</>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>

      <IconButton 
        edge="end"
        size="small"
        onClick={handleMenuOpen}
        sx={{ 
          color: colors.primary,
          opacity: 0.45,
          flexShrink: 0,
          '&:hover': { opacity: 1, bgcolor: `${colors.accent}12` }
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            borderRadius: '14px',
            boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
            minWidth: 130,
            border: `1px solid ${colors.border}`
          }
        }}
      >
        <MenuItem onClick={handleEditOpen} sx={{ gap: 1.5, fontWeight: 600, fontSize: '0.9rem', borderRadius: '8px', mx: 0.5 }}>
          <EditIcon fontSize="small" color="primary" /> Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteOpen} sx={{ gap: 1.5, fontWeight: 600, fontSize: '0.9rem', color: colors.danger, borderRadius: '8px', mx: 0.5 }}>
          <DeleteIcon fontSize="small" color="error" /> Delete
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog 
        open={isEditDialogOpen} 
        onClose={() => setIsEditDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: '20px', p: 1, maxWidth: 500, width: '100%' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: colors.primary, pb: 1 }}>Edit Task</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '8px !important' }}>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button 
            onClick={() => setIsEditDialogOpen(false)} 
            sx={{ fontWeight: 700, borderRadius: '10px', color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdate} 
            variant="contained"
            disabled={!editTitle.trim()}
            sx={{ 
              bgcolor: colors.accent, 
              fontWeight: 700, 
              borderRadius: '10px',
              px: 3,
              boxShadow: 'none',
              '&:hover': { bgcolor: colors.accentDark, boxShadow: 'none' }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={isDeleteDialogOpen} 
        onClose={() => setIsDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: '20px', p: 1, maxWidth: 400 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: colors.primary }}>Are you sure you want to delete this task?</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button 
            onClick={() => setIsDeleteDialogOpen(false)} 
            sx={{ fontWeight: 700, borderRadius: '10px', color: 'text.secondary' }}
          >
           Cancel 
          </Button>
          <Button 
            onClick={handleDelete} 
            variant="contained" 
            color="error"
            sx={{ fontWeight: 700, borderRadius: '10px', px: 3, boxShadow: 'none' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
