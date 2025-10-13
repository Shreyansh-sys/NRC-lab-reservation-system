// import React from 'react';
// import {
//   Typography,
//   Box,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Button,
// } from '@mui/material';
// import {
//   Science,
//   CalendarMonth,
//   TrendingUp,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// const Dashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const quickActions = [
//     {
//       title: 'Browse Equipment',
//       description: 'View available laboratory equipment',
//       icon: <Science sx={{ fontSize: 40 }} />,
//       path: '/equipment',
//       color: '#1976d2',
//     },
//     {
//       title: 'My Reservations',
//       description: 'Manage your equipment reservations',
//       icon: <CalendarMonth sx={{ fontSize: 40 }} />,
//       path: '/reservations',
//       color: '#2e7d32',
//     },
//     {
//       title: 'Usage Analytics',
//       description: 'View your equipment usage statistics',
//       icon: <TrendingUp sx={{ fontSize: 40 }} />,
//       path: '/analytics',
//       color: '#ed6c02',
//     },
//   ];

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
//         Welcome back, {user?.username}!
//       </Typography>

//       <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//         {user?.role === 'student' && 'Ready to start your research? Browse available equipment and make reservations.'}
//         {user?.role === 'researcher' && 'Continue your research work. Manage your equipment reservations and track usage.'}
//         {user?.role === 'lab_manager' && 'Manage laboratory equipment, approve reservations, and monitor usage.'}
//         {user?.role === 'super_admin' && 'Overview of the entire laboratory reservation system.'}
//       </Typography>

//       {/* Quick Actions */}
//       <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
//         Quick Actions
//       </Typography>

//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {quickActions.map((action, index) => (
//           <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}> {/* ✅ USE size PROP */}
//             <Card
//               sx={{
//                 height: '100%',
//                 cursor: 'pointer',
//                 transition: 'transform 0.2s',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: 3,
//                 },
//               }}
//               onClick={() => navigate(action.path)}
//             >
//               <CardContent sx={{ textAlign: 'center', p: 3 }}>
//                 <Box sx={{ color: action.color, mb: 2 }}>
//                   {action.icon}
//                 </Box>
//                 <Typography variant="h6" gutterBottom>
//                   {action.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {action.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Recent Activity Section */}
//       <Paper sx={{ p: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Recent Activity
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Your recent reservations and system notifications will appear here.
//         </Typography>
//         <Button
//           variant="outlined"
//           sx={{ mt: 2 }}
//           onClick={() => navigate('/reservations')}
//         >
//           View All Reservations
//         </Button>
//       </Paper>

//       {/* Role-specific content */}
//       {(user?.role === 'lab_manager' || user?.role === 'super_admin') && (
//         <Paper sx={{ p: 3, mt: 3, backgroundColor: 'info.light' }}>
//           <Typography variant="h6" gutterBottom>
//             Admin Overview
//           </Typography>
//           <Typography variant="body2">
//             {user.role === 'lab_manager' && 'You have access to equipment management and user approvals.'}
//             {user.role === 'super_admin' && 'You have full system administration privileges.'}
//           </Typography>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default Dashboard;

import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Science,
  CalendarMonth,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Browse Equipment',
      description: 'View available laboratory equipment',
      icon: <Science sx={{ fontSize: 40 }} />,
      path: '/equipment',
      color: '#1976d2',
    },
    {
      title: 'My Reservations',
      description: 'Manage your equipment reservations',
      icon: <CalendarMonth sx={{ fontSize: 40 }} />,
      path: '/reservations',
      color: '#2e7d32',
    },
    {
      title: 'Usage Analytics',
      description: 'View equipment usage statistics',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      path: '/analytics',
      color: '#ed6c02',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Welcome back, {user?.username}!
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {user?.role === 'student' && 'Ready to start your research? Browse available equipment and make reservations.'}
        {user?.role === 'researcher' && 'Continue your research work. Manage your equipment reservations and track usage.'}
        {user?.role === 'lab_manager' && 'Manage laboratory equipment, approve reservations, and monitor usage.'}
        {user?.role === 'super_admin' && 'Overview of the entire laboratory reservation system.'}
      </Typography>

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Quick Actions
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ color: action.color, mb: 2 }}>
                  {action.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your recent reservations and system notifications will appear here.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate('/reservations')}
        >
          View All Reservations
        </Button>
      </Paper>

      {/* Role-specific content */}
      {(user?.role === 'lab_manager' || user?.role === 'super_admin') && (
        <Paper sx={{ p: 3, mt: 3, backgroundColor: 'info.light' }}>
          <Typography variant="h6" gutterBottom>
            Admin Overview
          </Typography>
          <Typography variant="body2">
            {user.role === 'lab_manager' && 'You have access to equipment management and user approvals.'}
            {user.role === 'super_admin' && 'You have full system administration privileges.'}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Dashboard;