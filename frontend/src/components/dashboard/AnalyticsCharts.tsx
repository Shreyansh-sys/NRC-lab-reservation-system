import React from 'react';
import {
    Paper,
    Typography,
    // Box,
    Grid,
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from 'recharts';
import { AnalyticsData } from '../../services/analytics';

interface AnalyticsChartsProps {
    data: AnalyticsData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ data }) => {
    return (
        <Grid container spacing={3}>
            {/* Monthly Reservations Trend */}
            <Grid size={{ xs: 12, md: 8 }}>
                <Paper sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom>
                        Monthly Reservations Trend
                    </Typography>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={data.monthly_stats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="reservations"
                                stroke="#8884d8"
                                name="Reservations"
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="hours"
                                stroke="#82ca9d"
                                name="Total Hours"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>

            {/* Equipment Utilization */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom>
                        Equipment Utilization
                    </Typography>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={data.equipment_utilization}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={({ utilization_rate, equipment_name }: any) =>
                                    `${equipment_name.split(' ')[0]}: ${utilization_rate}%`
                                }
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="utilization_rate"
                            >
                                {data.equipment_utilization.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>

            {/* Top Equipment Usage */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom>
                        Equipment Usage (Hours)
                    </Typography>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={data.equipment_utilization}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="equipment_name"
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total_hours" fill="#8884d8" name="Total Hours" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>

            {/* User Activity */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom>
                        Top Users Activity
                    </Typography>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={data.user_activity}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="user_name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="reservation_count" fill="#8884d8" name="Reservations" />
                            <Bar dataKey="total_hours" fill="#82ca9d" name="Total Hours" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AnalyticsCharts;