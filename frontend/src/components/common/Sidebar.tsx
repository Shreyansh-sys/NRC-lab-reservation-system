import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  Science,
  CalendarMonth,
  Person,
  Settings,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Equipment', icon: <Science />, path: '/equipment' },
    { text: 'My Reservations', icon: <CalendarMonth />, path: '/reservations' },
  ];

  // Admin-only menu items
  const adminMenuItems = [
    { text: 'All Reservations', icon: <CalendarMonth />, path: '/admin/reservations' },
    { text: 'User Management', icon: <Person />, path: '/admin/users' },
    { text: 'System Settings', icon: <Settings />, path: '/admin/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Lab System
        </Typography>
      </Toolbar>
      
      <Box sx={{ overflow: 'auto' }}>
        {/* Main Menu */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={isActive(item.path)}
                onClick={() => navigate(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive(item.path) ? 'white' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Admin Section (only show for admins/lab managers) */}
        {(user?.role === 'super_admin' || user?.role === 'lab_manager') && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
              Admin
            </Typography>
            <List>
              {adminMenuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected={isActive(item.path)}
                    onClick={() => navigate(item.path)}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: 'secondary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'secondary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive(item.path) ? 'white' : 'inherit',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
export {};