import * as React from 'react';
import Box from '@mui/material/Box';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useUserAuth } from '../../Context/UserAuthContext';
import { useMainContext } from '../../Context/MainContext';
import { Button } from 'react-bootstrap';
import DataTable from '../../Components/DataTable';


function Toolbar() {
    return (
      <Box
        sx={{
          p: 1,
          pt: 1.5,
          pb: 0,
        }}
        style={{textAlign: "right"}}
      >
        <GridToolbarQuickFilter style={{ border: "1px", borderStyle: "solid", borderRadius: "5px", padding: "5px", borderColor: "#c4c4c4"}}/>
      </Box>
    );
}

export default function UserData() {
    const { setUserData } = useMainContext();
    
    const columns = [
        { field: 'id', width: 100,headerName: 'User ID', },
        { field: 'username', width: 200,headerName: 'User name', }, 
        { field: 'Email', flex: 1, minWidth: 200, maxWidth: 300, headerName: 'Email',}, 
        { field: 'Roles', 
            width: 200,
            headerName: 'Roles',
            renderCell: (params) => {
                const user = params.row
                if(user?.Role?.user === true && user.Role.editor === false && user.Role.admin === false){
                    return(
                        <div>
                            User
                        </div>
                )}
                if(user?.Role?.user === true && user.Role.editor === true && user.Role.admin === false){
                    return(
                        <div>
                            Editor
                        </div>
                )}
                if(user?.Role?.user === true && user.Role.editor === true && user.Role.admin === true){
                    return(
                        <div>
                            Admin
                        </div>
                )}
            }, 
        }, 
        { 
            field: 'Actions', 
            headerName: 'Actions', 
            flex: 1,
            renderCell: (params) => {
                const user = params.row
                const handleEditClick = () => {
                    setUserData(user)
                    console.log("Edit Clicked")
                }
                return (
                    <Button variant="warning" onClick={handleEditClick}>Edit Permission</Button>
                )
            }, 
        }
    ]
    
    const { rows } = useUserAuth();
    return (
        <Box sx={{ height: 700, width: '100%' }}>
            <DataTable rows={rows} columns={columns} Toolbar={Toolbar}/>
        </Box>
    );
}
