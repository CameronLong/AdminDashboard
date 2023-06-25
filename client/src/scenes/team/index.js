import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CellSelectionFormulaField from "../../components/DataGrid";

const Team = () => {
    //Pop up handlers
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        borderRadius={'4px'}
                        backgroundColor={
                            status === 'admin'
                                ? colors.greenAccent[600]
                                : colors.greenAccent[700]
                        }
                    >
                        {status === 'admin' && <AdminPanelSettingsOutlinedIcon />}
                        {status === 'manager' && <SecurityOutlinedIcon />}
                        {status === 'user' && <LockOpenOutlinedIcon />}
                        <Button variant="text" onClick={handleClickOpen}>
                            {status}
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Edit user</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please select a value to change from the drop down below.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="Id"
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        mr: '8px'
                                    }}
                                />
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="Username"
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        mr: '8px'
                                    }}
                                />
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="First Name"
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        mr: '8px'
                                    }}
                                />
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="Last Name"
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        mr: '8px'
                                    }}
                                />
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="Email Address"
                                    fullWidth
                                    type="email"
                                    variant="outlined"
                                />
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="Contact Number"
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="Address 1"
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    sx={{
                                        mr: '8px'
                                    }}
                                />
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    sx={{
                                        mr: '8px'
                                    }}
                                />
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="Access Level"
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        mr: '8px'
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Save</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                )
            }
        },
    ]


    const [teamArray, setTeamArray] = useState([]);
    useEffect(() => {
        const getTeam = async () => {
            await axios.get('http://localhost:5001/getTeam')
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
                <CellSelectionFormulaField team={teamArray}/>
            </Box>
        </Box>
    )
}

export default Team;