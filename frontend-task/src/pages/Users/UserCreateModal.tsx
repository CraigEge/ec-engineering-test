import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import { ChangeEvent, FormEvent, useCallback, useState } from "react"
import { useCreateUserMutation } from "../../app/services/user"
import getError from "../../util/getError"

type Props = {
  open?: boolean
  onClose?: () => void
}

export default function UserCreateModal({ open = false, onClose }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const [createUser, { error }] = useCreateUserMutation()

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await createUser(formData)

        setFormData({
          name: "",
          email: "",
        })
        onClose?.()
      } catch (error) {
        console.error(error)
      }
    },
    [createUser, formData, onClose],
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              autoFocus
              required
              name="name"
              label="Name"
              fullWidth
              variant="standard"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              required
              name="email"
              label="Email"
              fullWidth
              variant="standard"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {getError(error)}
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
