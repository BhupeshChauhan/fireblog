import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

const DataTable = (props) => {
    const {rows, columns, Toolbar} = props;
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(5);

    return (
        <DataGrid
                pagination
                rowsPerPageOptions={[5]}
                page={page}
                pageSize={pageSize}
                rows={rows}
                columns={columns}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                disableSelectionOnClick
                components={{ Toolbar: Toolbar }}
                componentsProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                },
                }}
            />
    )
}

export default DataTable;