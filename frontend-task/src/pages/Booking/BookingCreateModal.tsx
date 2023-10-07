import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import moment from "moment/moment"
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react"
import { useCreateBookingMutation } from "../../app/services/booking"
import { useGetParcsQuery } from "../../app/services/parc"
import { useGetUsersQuery } from "../../app/services/user"
import { Parc } from "../../model/parc"
import { User } from "../../model/user"
import getError from "../../util/getError"

type FormData = {
  user: User | null
  parc: Parc | null
  bookingdate: moment.Moment
  comments: string
}

type Props = {
  open?: boolean
  onClose?: () => void
}

export default function BookingCreateModal({ open = false, onClose }: Props) {
  const [formData, setFormData] = useState<FormData>({
    user: null,
    parc: null,
    bookingdate: moment(),
    comments: "",
  })

  const { data: users = [], isLoading: isUsersLoading } = useGetUsersQuery()
  const { data: parcs = [], isLoading: isParcsLoading } = useGetParcsQuery()

  const [createBooking, { error }] = useCreateBookingMutation()

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await createBooking({
          ...formData,
          user: formData.user!.id,
          parc: formData.parc!.id,
        })

        setFormData({
          user: null,
          parc: null,
          bookingdate: moment(),
          comments: "",
        })
        onClose?.()
      } catch (error) {
        console.error(error)
      }
    },
    [createBooking, formData, onClose],
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
        <DialogTitle>Create Booking</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Autocomplete
              fullWidth
              options={users}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={formData.user}
              onChange={(e, value) => {
                setFormData({
                  ...formData,
                  user: value,
                })
              }}
              loading={isUsersLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Users"
                  name="user"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isUsersLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />

            <Autocomplete
              fullWidth
              options={parcs}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={formData.parc}
              onChange={(e, value) => {
                setFormData({
                  ...formData,
                  parc: value,
                })
              }}
              loading={isParcsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Parc"
                  name="parc"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isParcsLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />

            <TextField
              required
              name="comments"
              label="Comments"
              fullWidth
              variant="standard"
              type="datetime-local"
              value={formData.bookingdate.format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  bookingdate: moment(e.target.value),
                })
              }}
            />

            <TextField
              required
              name="comments"
              label="Comments"
              fullWidth
              variant="standard"
              value={formData.comments}
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
