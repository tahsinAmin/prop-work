'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import GroupIcon from '@mui/icons-material/Group';

interface DashboardLayoutProps {
  children: ReactNode;
}

const drawerWidth = 240;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  
  // Detect current route
  useEffect(() => {
    const path = window.location.pathname;
    setActiveRoute(path);
  }, []);
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    router.push('/login');
  };

  const handleProfile = () => {
    handleClose();
    // Navigate to profile page (not implemented in this example)
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Icon icon="ic:baseline-menu" width={24} height={24} />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
           
          </Box>
          
          <IconButton size="small" sx={{ background: '#e0f2f1', borderRadius: '20%' }}>
            <SearchOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <NotificationsOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <LightModeOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <DarkModeOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }} alt="Remy Sharp" src="/user-1.jpg">
              T
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar - Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
            backgroundColor: '#fff',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        {renderDrawerContent()}
      </Drawer>

      {/* Sidebar - Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            backgroundColor: '#fff',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        {renderDrawerContent()}
      </Drawer>

      {/* Main content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          p: 3,
          pl: { xs: 3, xl: '100px' },
          pr: { xs: 3, xl: '140px' },
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          minHeight: '100vh',
          maxWidth: '100%',
          overflowX: 'hidden'
        }}
      >
        <Toolbar /> {/* Spacer to push content below app bar */}
        {children}
      </Box>
    </Box>
  );

  // Helper function to render drawer content
  function renderDrawerContent() {
    return (
      <>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', pt: 10 }}>
          <Box component="img" src="/site-logo.jpg" alt="Lorem Logo"  />
        </Box>
        <Box sx={{ overflow: 'auto', height: '100%' }}>
          {/* <Box sx={{ p: 2, mt: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.5px' }}>
              OVERVIEW
            </Typography>
          </Box> */}
          <List>
            <ListItem disablePadding>
              <ListItemButton 
                component="a" 
                href="/dashboard" 
                selected={activeRoute === '/dashboard'}
              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Icon 
                    icon="ic:baseline-dashboard" 
                    width={24} 
                    height={24} 
                    color={activeRoute === '/dashboard' ? 'primary' : undefined} 
                  />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <Icon 
                  icon="ic:baseline-dashboard" 
                  width={24} 
                  height={24} 
                  color={activeRoute === '/dashboard' ? 'primary' : undefined} 
                />
              </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
            <ListItem disablePadding>
              <ListItemButton 
                component="a" 
                href="/onboarding" 
                selected={activeRoute.includes('/onboarding')}
              >
               <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Icon 
                    icon="ic:baseline-person-add" 
                    width={24} 
                    height={24} 
                    color={activeRoute.includes('/onboarding') ? 'primary' : undefined} 
                  />
                </ListItemIcon>
                <ListItemText primary="Marketing Insights" />
              </ListItemButton>
            </ListItem>
           
            <ListItem>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Referral & Reward" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SettingsPhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Support & Feedback" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </>
    );
  }
}
