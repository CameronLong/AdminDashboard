import { Box, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import axios from 'axios';
import { useEffect, useState } from "react";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "address1",
            headerName: "Address",
            flex: 1,
        },
    ]

    const [teamArray, setTeamArray] = useState([]);
    useEffect(() => {
        const getTeam = async () => {
            await axios.get('/getTeam')
                // .then((response) => {
                //     console.log("Team: " + response.data.team);
                // })
                .then((response) => setTeamArray(response.data.team))
        }
        getTeam();
    }, []);

    return (
        <Box m='20px'>
            <Header title={'CONTACTS'} subtitle={'List of contacts for future reference'} />
            <Box
            m='40px 0 0 0'
            height='75vh'
            sx={{
                "& .MuiDataGrid-root": {
                    border : 'none',
                },
                "& .MuiDataGird-cell": {
                    borderBottom : 'none',
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: 'none',
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: 'none',
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}
            >
                <DataGrid
                    rows={teamArray}
                    columns={columns}
                    components={{Toolbar: GridToolbar}}
                />
            </Box>
        </Box>
    )
}

export default Team;