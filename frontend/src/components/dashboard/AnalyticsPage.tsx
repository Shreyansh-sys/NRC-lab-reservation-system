import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  Home,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../../services/analytics';
import AnalyticsCharts from './AnalyticsCharts';

const AnalyticsPage: React.FC = () => {
  const navigate = useNavigate();

  // Analytics data query
  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ['analytics'],
    queryFn: analyticsService.getDashboardData,
  });

  // Stats data for the cards
  const stats = analytics ? [
    {
      label: 'Total Reservations',
      value: analytics.total_reservations,
      color: '#1976d2',
    },
    {
      label: 'Active Reservations',
      value: analytics.active_reservations,
      color: '#2e7d32',
    },
    {
      label: 'Active Users',
      value: analytics.user_activity.length,
      color: '#ed6c02',
    },
    {
      label: 'Equipment Items',
      value: analytics.equipment_utilization.length,
      color: '#9c27b0',
    },
  ] : [];

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">
          Error loading analytics data: {(error as Error).message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate('/dashboard')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <TrendingUp sx={{ mr: 0.5 }} fontSize="inherit" />
          Analytics
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          System Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive overview of equipment usage, reservations, and user activity across the laboratory.
        </Typography>
      </Box>

      {/* Quick Stats Cards */}
      {!isLoading && analytics && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid key={`stat-${index}`} size={{ xs: 12, sm: 6, md: 3 }}> {/* ✅ MUI v7 SYNTAX */}
              <Paper
                sx={{
                  p: 3,
                  background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}40)`,
                  borderLeft: `4px solid ${stat.color}`,
                  height: '100%',
                }}
              >
                <Box>
                  <Typography variant="h4" fontWeight="bold" color={stat.color}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Analytics Charts */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      ) : analytics ? (
        <AnalyticsCharts data={analytics} />
      ) : (
        <Alert severity="info">
          Analytics data will appear here once available.
        </Alert>
      )}

      {/* Additional Insights */}
      {analytics && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Key Insights
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}> {/* ✅ MUI v7 SYNTAX */}
              <Typography variant="body2" color="text.secondary">
                <strong>Most Used Equipment:</strong>{' '}
                {analytics.equipment_utilization[0]?.equipment_name || 'N/A'} 
                ({analytics.equipment_utilization[0]?.utilization_rate}% utilization)
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}> {/* ✅ MUI v7 SYNTAX */}
              <Typography variant="body2" color="text.secondary">
                <strong>Top User:</strong>{' '}
                {analytics.user_activity[0]?.user_name || 'N/A'} 
                ({analytics.user_activity[0]?.reservation_count} reservations)
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}> {/* ✅ MUI v7 SYNTAX */}
              <Typography variant="body2" color="text.secondary">
                <strong>Busiest Month:</strong>{' '}
                {analytics.monthly_stats.reduce((max, stat) => 
                  stat.reservations > max.reservations ? stat : max
                ).month || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}> {/* ✅ MUI v7 SYNTAX */}
              <Typography variant="body2" color="text.secondary">
                <strong>Average Utilization:</strong>{' '}
                {Math.round(analytics.equipment_utilization.reduce((sum, eq) => 
                  sum + eq.utilization_rate, 0) / analytics.equipment_utilization.length
                )}%
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default AnalyticsPage;