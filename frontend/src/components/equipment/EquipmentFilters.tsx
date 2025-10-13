import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { EquipmentCategory } from '../../types/equipment';

interface EquipmentFiltersProps {
  categories: EquipmentCategory[];
  filters: {
    category: string;
    status: string;
    location: string;
    search: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

const EquipmentFilters: React.FC<EquipmentFiltersProps> = ({
  categories,
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter Equipment
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
        {/* Search */}
        <TextField
          label="Search Equipment"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Search by name, description..."
          fullWidth
        />

        {/* Category Filter */}
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category}
            label="Category"
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Status Filter */}
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="reserved">Reserved</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
            <MenuItem value="out_of_service">Out of Service</MenuItem>
          </Select>
        </FormControl>

        {/* Location Filter */}
        <TextField
          label="Location"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          placeholder="Filter by location..."
          fullWidth
        />
      </Box>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button onClick={onClearFilters} variant="outlined" size="small">
            Clear All Filters
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default EquipmentFilters;