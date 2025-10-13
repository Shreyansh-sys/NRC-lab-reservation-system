import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  CardActions,
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  BuildCircle,
} from '@mui/icons-material';
import { Equipment } from '../../types/equipment';

interface EquipmentCardProps {
  equipment: Equipment;
  onReserve: (equipment: Equipment) => void;  // Now passes the full equipment object
  onViewDetails: (equipment: Equipment) => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  onReserve,
  onViewDetails,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'reserved': return 'warning';
      case 'maintenance': return 'error';
      case 'out_of_service': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'reserved': return 'Reserved';
      case 'maintenance': return 'Maintenance';
      case 'out_of_service': return 'Out of Service';
      default: return status;
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Equipment Image */}
      {equipment.image ? (
        <CardMedia
          component="img"
          height="200"
          image={equipment.image}
          alt={equipment.name}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          <BuildCircle sx={{ fontSize: 64, color: '#9e9e9e' }} />
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Equipment Name and Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            {equipment.name}
          </Typography>
          <Chip
            label={getStatusText(equipment.status)}
            color={getStatusColor(equipment.status) as any}
            size="small"
          />
        </Box>

        {/* Category */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {equipment.category_name}
        </Typography>

        {/* Description */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          {equipment.description.length > 100 
            ? `${equipment.description.substring(0, 100)}...`
            : equipment.description
          }
        </Typography>

        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {equipment.location}
          </Typography>
        </Box>

        {/* Specifications (show first 2) */}
        {Object.entries(equipment.specifications).slice(0, 2).map(([key, value]) => (
          <Typography key={key} variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            <strong>{key}:</strong> {String(value)}
          </Typography>
        ))}

        {/* Training Requirement */}
        {equipment.requires_training && (
          <Chip
            label="Training Required"
            color="primary"
            size="small"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button
          size="small"
          onClick={() => onViewDetails(equipment)}
        >
          View Details
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<CalendarToday />}
          onClick={() => onReserve(equipment)}
          disabled={equipment.status !== 'available'}
        >
          Reserve
        </Button>
      </CardActions>
    </Card>
  );
};

export default EquipmentCard;