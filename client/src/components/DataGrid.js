import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useValue } from '';
import { getUsers } from '',

const DataGrid = ({ setSelectedLink, link }) => {
    const { state: { users } } = useValue()

    useEffect(() => {
        setSelectedLink(link);
        if (users.length === 0) getUsers(dispatch)
    }, []);

    const columns = useMemo(() => [
        {field: 'photoUrl', headerName:'Avatar', width:60},
        {field: 'name', headerName:'Name', width:170},
        {field: 'email', headerName:'Email', width:200},
        {field: 'role', headerName:'Role', width:100},
        {field: 'active', headerName:'Active', width:100},
        {field: 'createdAt', headerName:'Created at', width:200},
        {field: '_id', headerName:'ID', width:220},
    ])

    return (
        <Box
            sx={{
                height: 400,
                width: '100%'
            }}
        >
            <Typography
                variant='h3'
                component={'h3'}
                sx={{ textAlign: 'center', mt: 3, mb: 3 }}
            >
                Manage Users
            </Typography>
            <DataGrid
                columns={ columns }
                rows={ users }
                getRowID={row=>row._id}
            />


        </Box>
    )
}