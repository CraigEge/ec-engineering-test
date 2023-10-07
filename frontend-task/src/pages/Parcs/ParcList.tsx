import { Alert, Box, Button, Container, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid"
import { useCallback, useState } from "react"
import {
  useDeleteParcMutation,
  useGetParcsQuery,
} from "../../app/services/parc"
import getError from "../../util/getError"
import ParcCreateModal from "./ParcCreateModal"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 100, flex: 0.2 },
  { field: "name", headerName: "Name", minWidth: 100, flex: 0.2 },
  { field: "description", headerName: "Description", minWidth: 100, flex: 0.6 },
]

export default function ParcList() {
  const { data = [], isLoading, error } = useGetParcsQuery()
  const [deleteParc] = useDeleteParcMutation()

  const [isCreateOpen, setCreateOpen] = useState(false)

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([])

  const onDelete = useCallback(async () => {
    try {
      await Promise.all(
        rowSelectionModel.map((id) => deleteParc({ id: id as string })),
      )
      setRowSelectionModel([])
    } catch (error) {
      console.error(error)
    }
  }, [deleteParc, rowSelectionModel, setRowSelectionModel])

  return (
    <Container sx={{ mt: 2 }}>
      <Box display="flex" alignItems="center">
        <Typography component="h1" variant="h3" flex={1}>
          Parcs
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
          rows={data}
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

      <ParcCreateModal
        open={isCreateOpen}
        onClose={() => setCreateOpen(false)}
      />
    </Container>
  )
}
