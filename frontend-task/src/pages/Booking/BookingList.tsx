import { Alert, Box, Button, Container, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid"
import { useCallback, useMemo, useState } from "react"
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
} from "../../app/services/booking"
import { useGetParcsQuery } from "../../app/services/parc"
import { useGetUsersQuery } from "../../app/services/user"
import getError from "../../util/getError"
import BookingCreateModal from "./BookingCreateModal"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 100, flex: 0.1 },
  {
    field: "user",
    headerName: "User",
    minWidth: 100,
    flex: 0.2,
    renderCell: (params) => params.value.name ?? params.value.id,
  },
  {
    field: "parc",
    headerName: "Parc",
    minWidth: 100,
    flex: 0.2,
    renderCell: (params) => params.value.name ?? params.value.id,
  },
  {
    field: "bookingdate",
    headerName: "Booking Date",
    minWidth: 100,
    flex: 0.2,
    renderCell: (params) => params.value.format("DD/MM/YYYY HH:mm"),
  },
  {
    field: "comments",
    headerName: "Comments",
    minWidth: 100,
    flex: 0.3,
  },
]

export default function BookingList() {
  const { data, isLoading, error } = useGetBookingsQuery()
  const { data: users } = useGetUsersQuery()
  const { data: parcs } = useGetParcsQuery()

  const [deleteBooking] = useDeleteBookingMutation()

  const [isCreateOpen, setCreateOpen] = useState(false)

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([])

  const onDelete = useCallback(async () => {
    try {
      await Promise.all(
        rowSelectionModel.map((id) => deleteBooking({ id: id as string })),
      )
      setRowSelectionModel([])
    } catch (error) {
      console.error(error)
    }
  }, [deleteBooking, rowSelectionModel, setRowSelectionModel])

  const rows = useMemo(() => {
    if (!!data) {
      return data.map((booking) => ({
        ...booking,
        user: users?.find((user) => user.id === booking.user) ?? {
          id: booking.user,
        },
        parc: parcs?.find((parc) => parc.id === booking.parc) ?? {
          id: booking.parc,
        },
      }))
    }

    return []
  }, [data, users, parcs])

  return (
    <Container sx={{ mt: 2 }}>
      <Box display="flex" alignItems="center">
        <Typography component="h1" variant="h3" flex={1}>
          Bookings
        </Typography>

        <Box display="flex" gap={2}>
          <Button
            color="error"
            disabled={rowSelectionModel.length < 1}
            onClick={onDelete}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCreateOpen(true)}
          >
            Create
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {getError(error)}
        </Alert>
      )}

      <Box sx={{ mt: 2, height: 400 }}>
        <DataGrid
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          loading={isLoading}
          checkboxSelection
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={(newSelection) =>
            setRowSelectionModel(newSelection)
          }
        />
      </Box>

      <BookingCreateModal
        open={isCreateOpen}
        onClose={() => setCreateOpen(false)}
      />
    </Container>
  )
}
