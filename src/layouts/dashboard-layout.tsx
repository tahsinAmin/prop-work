'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useTheme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Badge, Collapse } from '@mui/material';
import { AccountCircle, ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

interface DashboardLayoutProps {
  children: ReactNode;
}

const drawerWidth = 398;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');

  const pathname = usePathname();
  const containerLeftPadding = pathname?.startsWith('/detail') ? '82px' : pathname?.startsWith('/dashboard') ? '100px' : '190px';
  const containerRightPadding = pathname?.startsWith('/detail') ? '0' : pathname?.startsWith('/create') ? '245px' : '140px';
  const containerTopPadding = pathname?.startsWith('/create') ? '57px' : '147px';

  const [openProperties, setOpenProperties] = React.useState(false);
  const [openLuxury, setOpenLuxury] = React.useState(false);

  const handlePropertiesDropdown = () => {
    setOpenProperties(!openProperties);
  };

  const handleLuxuryDropdown = () => {
    setOpenLuxury(!openLuxury);
  };

  // Detect current route
  useEffect(() => {
    const path = window.location.pathname;
    setActiveRoute(path);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const MaterialUISwitch = styled(Switch)(({ theme }: any) => ({
    width: '77px',
    height: '41.16px',
    padding: 0,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(37px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="16" width="16" viewBox="0 0 16 16"><path fill="${encodeURIComponent('#fff')}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#CCCCCC',
          ...theme.applyStyles('dark', {
            backgroundColor: '#CCCCCC',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#001e3c',
      width: '33px',
      height: '33px',
      position: 'relative',
      top: '3px',
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="16" width="16" viewBox="0 0 16 16"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      ...theme.applyStyles('dark', {
        backgroundColor: '#003892',
      }),
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#aab4be',
      borderRadius: 20 / 1,
      ...theme.applyStyles('dark', {
        backgroundColor: '#8796A5',
      }),
    },
  }));

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<HTMLElement | null>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={(event: React.MouseEvent<HTMLElement>) => handleProfileMenuOpen(event)}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


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
          pr: '116px',
          pt: '75px'
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

          <Box sx={{ display: 'flex', gap: '32px', height: '60px', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: '16px', height: '54px', alignItems: 'center' }}>
            <IconButton sx={{ backgroundColor: '#F4F8EE', borderRadius: '20%', height: '54px', width: '54px' }}>
              <SearchOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ backgroundColor: '#F4F8EE', borderRadius: '20%', height: '54px', width: '54px' }}>
              <Badge color="error" variant="dot">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
            <MaterialUISwitch sx={{ m: 0 }} defaultChecked />
            </Box>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src="/user-1.jpg" sx={{ width: '60px', height: '60px' }} />
              </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}

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
            width: '258px',
            border: 'none',
            backgroundColor: '#fff',
            marginLeft: '140px'
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
            width: '258px',
            boxSizing: 'border-box',
            border: 'none',
            backgroundColor: '#fff',
            marginLeft: '140px'
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
          pt: containerTopPadding,
          pl: { xs: 3, xl: containerLeftPadding },
          pr: { xs: 3, xl: containerRightPadding },
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
          <Box component="img" src="/site-logo.jpg" alt="Lorem Logo" />
        </Box>
        <Box sx={{ overflow: 'auto', height: '100%' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/dashboard"
                selected={activeRoute === '/dashboard'}
              >
                <ListItemIcon sx={{ minWidth: '24px' }}>
                  <Box
                    component="svg"
                    viewBox="0 0 24 24"
                    sx={{
                      width: 24,
                      height: 24,
                      marginRight: '15px',
                      color: activeRoute === '/dashboard' ? 'primary.main' : 'action.active',
                    }}
                  >
                    <path opacity="0.25" d="M16.0971 2H19.4831C20.8854 2 22.0216 3.14585 22.0216 4.55996V7.97452C22.0216 9.38864 20.8854 10.5345 19.4831 10.5345H16.0971C14.6948 10.5345 13.5586 9.38864 13.5586 7.97452V4.55996C13.5586 3.14585 14.6948 2 16.0971 2Z" fill="black" />
                    <path d="M7.94824 13.4648C9.35024 13.465 10.4861 14.6106 10.4863 16.0244V19.4395C10.4863 20.8525 9.35034 21.9989 7.94824 21.999H4.56152C3.15948 21.9988 2.02348 20.8524 2.02344 19.4395V16.0244C2.02365 14.6106 3.15959 13.4651 4.56152 13.4648H7.94824ZM19.4834 13.4648C20.8854 13.465 22.0213 14.6106 22.0215 16.0244V19.4395C22.0214 20.8525 20.8855 21.9989 19.4834 21.999H16.0967C14.6946 21.9988 13.5586 20.8524 13.5586 19.4395V16.0244C13.5588 14.6106 14.6947 13.4651 16.0967 13.4648H19.4834ZM7.94824 2C9.35024 2.00017 10.4861 3.14575 10.4863 4.55957V7.97461C10.4863 9.38858 9.35034 10.534 7.94824 10.5342H4.56152C3.15948 10.5339 2.02348 9.38853 2.02344 7.97461V4.55957C2.02365 3.14579 3.15959 2.00024 4.56152 2H7.94824Z" fill="black" />
                  </Box>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItemButton onClick={handlePropertiesDropdown}>
              <ListItemIcon sx={{ minWidth: '24px' }}>
                <Box
                  component="svg"
                  viewBox="0 0 22 22"
                  sx={{
                    width: 22,
                    height: 22,
                    marginRight: '15px',
                  }}
                >
                  <path d="M21 21H1" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <path opacity="0.5" d="M20 21V5C20 3.114 20 2.172 19.414 1.586C18.828 1 17.886 1 16 1H14C12.114 1 11.172 1 10.586 1.586C10.114 2.057 10.022 2.76 10.004 4" stroke="black" strokeWidth="1.5" />
                  <path d="M14 21V8C14 6.114 14 5.172 13.414 4.586C12.828 4 11.886 4 10 4H6C4.114 4 3.172 4 2.586 4.586C2 5.172 2 6.114 2 8V21" stroke="black" strokeWidth="1.5" />
                  <path d="M8 21V18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <path opacity="0.5" d="M5 7H11M5 10H11M5 13H11" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </Box>
              </ListItemIcon>
              <ListItemText primary="Properties" />
              {openProperties ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProperties} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleLuxuryDropdown}>
              <ListItemIcon sx={{ minWidth: '24px' }}>
                <Box
                  component="svg"
                  viewBox="0 0 24 24"
                  sx={{
                    width: 24,
                    height: 24,
                    marginRight: '15px',
                  }}
                >
                  <path d="M4.87573 12.874L10.5877 18.586C11.2537 19.253 11.5877 19.586 12.0017 19.586C12.4157 19.586 12.7497 19.253 13.4157 18.586L19.1277 12.874C19.5527 12.449 19.7657 12.236 19.8307 11.96C19.8957 11.683 19.8007 11.398 19.6107 10.827L18.9137 8.735C18.4737 7.415 18.2537 6.755 17.7297 6.378C17.2057 6 16.5097 6 15.1187 6H8.88473C7.49373 6 6.79773 6 6.27473 6.378C5.74973 6.755 5.52973 7.415 5.08973 8.735L4.39273 10.827C4.20273 11.397 4.10773 11.683 4.17273 11.96C4.23773 12.236 4.45073 12.449 4.87573 12.874Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </Box>
              </ListItemIcon>
              <ListItemText primary="Luxury Assets" />
              {openLuxury ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openLuxury} timeout="auto" unmountOnExit>
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
              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Image
                    src="/solar-graph.jpg"
                    alt="solar-graph"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Marketing Insights" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component="a"
              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Image
                    src="/graph-bar.jpg"
                    alt="graph-bar"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Marketing Tool" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component="a"

              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Image
                    src="/professional.jpg"
                    alt="professional service"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Professional Service" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component="a"

              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Image
                    src="/tenator.jpg"
                    alt="tenator"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Tenator" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component="a"

              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Image
                    src="/networking.jpg"
                    alt="networking"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Networking & event" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component="a"

              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Image
                    src="/education.jpg"
                    alt="education"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Education & Resource" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component="a"

              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Image
                    src="/market-players.jpg"
                    alt="market"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Market Players" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component="a"

              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Image
                    src="/referral.jpg"
                    alt="referral"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Referral & Reward" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component="a"

              >
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <Image
                    src="/support.jpg"
                    alt="support"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText primary="Support & Feedback" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </>
    );
  }
}
