import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from 'axios';
import { useEffect, useState } from "react";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
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
            field: "username",
            headerName: "Username",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row: { status } }) => {
                return (
                    <Box
                        width={'60%'}
                        m='0 auto'
                        p='5px'
                        display='flex'
                        justifyContent={'center'}
                        backgroundColor={
                            status === 'admin'
                                ? colors.greenAccent[600]
                                : colors.greenAccent[700]
                        }
                        borderRadius={'4px'}
                    >
                        {status === 'admin' && <AdminPanelSettingsOutlinedIcon />}
                        {status === 'manager' && <SecurityOutlinedIcon />}
                        {status === 'user' && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                            {status}
                        </Typography>
                    </Box>
                )
            }
        },
    ]


    const [teamArray, setTeamArray] = useState([]);
    useEffect(() => {
        const getTeam = async () => {
            await axios.get('http://localhost:5001/getTeam')
                // .then((response) => {
                //     console.log("Team: " + response.data.team);
                // })
                .then((response) => setTeamArray(response.data.team))
        }
        getTeam();
    }, []);

    return (
        <Box m='20px'>
            <Header title={'TEAM'} subtitle={'Managing the Team Members'} />
            <Box
                m='40px 0 0 0'
                height='75vh'
                sx={{
                    "& .MuiDataGrid-root": {
                        border: 'none',
                    },
                    "& .MuiDataGird-cell": {
                        borderBottom: 'none',
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
                    }
                }}
            >
                <DataGrid
                    rows={teamArray}
                    columns={columns}
                />
            </Box>
        </Box>
    )
}

export default Team;