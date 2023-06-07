import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import tokens from '../../theme';
import { mockDataTeam } from '../../data/mockData';
import { AdminPanelSettingsOutlinedIcon } from "@mui/icons-material/AdminPanelSettings";
import { LockOpenOutlinedIcon } from "@mui/icons-material/LockOpenOutlined";
import { SecurityOutlinedIcon } from "@mui/icons-material/Security";
import Header from "../../components/Header";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <Box>
            <Header title={'TEAM'}></Header>
        </Box>
    )
}

export default Team;