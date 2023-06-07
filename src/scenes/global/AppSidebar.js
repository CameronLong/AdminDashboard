import { useState } from "react";
import { Menu, MenuItem, Sidebar, sidebarClasses } from "react-pro-sidebar";
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

const AppSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box>
            <Sidebar collapsed={isCollapsed} rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: colors.primary[400],
                    borderColor: colors.primary[400],
                }
            }}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            colors: colors.primary[500],
                        }}
                    >
                        {!isCollapsed && (
                            <Box display='flex' justifyContent='space-between' alignItems={'center'} ml={'15px'}>
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINS
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}

                    </MenuItem>
                    {!isCollapsed && (
                        <Box mb={'25px'}>
                            <Box  display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <img 
                                    alt="profile-user"
                                    width={'100px'}
                                    height={'100px'}
                                    src={'../../assets/user.png'}
                                    style={{ cursor: 'pointer', borderRadius: '50%'}}
                                />
                            </Box>

                            <Box textAlign={'center'}>
                                <Typography variant="h2" color={colors.grey[100]} fontWeight={'bold'} sx={{ m: '10px 0 0 0'}}>Cameron Long</Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>Admin</Typography>
                            </Box>
                        </Box>
                    )}
                </Menu>
            </Sidebar>

        </Box>
    );
}

export default AppSidebar;