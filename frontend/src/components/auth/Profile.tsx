import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Person,
  Email,
  School,
  Phone,
  CalendarToday,
  CheckCircle,
  Pending,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box p={3}>
        <Typography variant="h4">Profile Not Found</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid size={{ xs: 12, md: 6 }}> {/* 👈 CHANGED: removed 'item' prop */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person />
              Basic Information
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText 
                  primary="Username" 
                  secondary={user.username}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary={user.email || 'Not provided'}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText 
                  primary="Role" 
                  secondary={
                    <Chip 
                      label={user.role.replace('_', ' ')} 
                      color="primary" 
                      size="small" 
                    />
                  }
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText 
                  primary="Phone" 
                  secondary={user.phone_number || 'Not provided'}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Institutional Information */}
        <Grid size={{ xs: 12, md: 6 }}> {/* 👈 CHANGED: removed 'item' prop */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <School />
              Institutional Information
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Institution ID" 
                  secondary={user.institution_id || 'Not provided'}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Department" 
                  secondary={user.department || 'Not provided'}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CalendarToday />
                </ListItemIcon>
                <ListItemText 
                  primary="Member Since" 
                  secondary={new Date(user.date_joined).toLocaleDateString()}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Status Information */}
        <Grid size={{ xs: 12 }}> {/* 👈 CHANGED: removed 'item' prop */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Status
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={user.is_approved ? <CheckCircle /> : <Pending />}
                label={user.is_approved ? 'Account Approved' : 'Pending Approval'}
                color={user.is_approved ? 'success' : 'warning'}
                variant="outlined"
              />
              
              <Chip
                icon={user.training_completed ? <CheckCircle /> : <Pending />}
                label={user.training_completed ? 'Training Completed' : 'Training Required'}
                color={user.training_completed ? 'success' : 'warning'}
                variant="outlined"
              />
              
              <Chip
                label={user.is_active ? 'Active' : 'Inactive'}
                color={user.is_active ? 'success' : 'default'}
                variant="outlined"
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" color="text.secondary">
              {!user.is_approved && 'Your account is pending administrator approval. You will be able to make reservations once approved.'}
              {user.is_approved && !user.training_completed && 'Your account is approved. Please complete the required training to access all equipment.'}
              {user.is_approved && user.training_completed && 'Your account is fully activated. You can access all available equipment.'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;