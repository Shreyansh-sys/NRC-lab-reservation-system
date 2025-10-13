import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import EquipmentCard from './EquipmentCard';
import EquipmentFilters from './EquipmentFilters';
import ReservationCalendar from '../reservations/ReservationCalendar';
import ReservationForm from '../reservations/ReservationForm';
import { equipmentService } from '../../services/equipment';
import { Equipment } from '../../types/equipment';
import { TimeSlot } from '../../types/reservation';

const EquipmentList: React.FC = () => {
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    location: '',
    search: '',
  });
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' | 'info' | 'warning' 
  });
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showReservationForm, setShowReservationForm] = useState(false);

  // Equipment query with new syntax
  const {
    data: equipment = [],
    isLoading: equipmentLoading,
    error: equipmentError,
    refetch: refetchEquipment,
  } = useQuery({
    queryKey: ['equipment', filters],
    queryFn: () => equipmentService.getEquipment(filters),
  });

  // Categories query with new syntax
  const {
    data: categories = [],
  } = useQuery({
    queryKey: ['categories'],
    queryFn: equipmentService.getCategories,
  });

  useEffect(() => {
    refetchEquipment();
  }, [filters, refetchEquipment]);

  const handleReserve = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setSnackbar({
      open: true,
      message: `Select a time slot for ${equipment.name}`,
      severity: 'info',
    });
  };

  const handleViewDetails = (equipment: Equipment) => {
    setSnackbar({
      open: true,
      message: `View details for ${equipment.name} will be implemented next!`,
      severity: 'info',
    });
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setShowReservationForm(true);
  };

  const handleReservationSuccess = () => {
    setSelectedEquipment(null);
    setSelectedSlot(null);
    setShowReservationForm(false);
    refetchEquipment();
    setSnackbar({
      open: true,
      message: 'Reservation created successfully!',
      severity: 'success',
    });
  };

  const handleReservationClose = () => {
    setSelectedEquipment(null);
    setSelectedSlot(null);
    setShowReservationForm(false);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      status: '',
      location: '',
      search: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (equipmentError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          Error loading equipment: {(equipmentError as Error).message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Equipment Catalog
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Browse and reserve laboratory equipment for your research needs.
      </Typography>

      {/* Filters */}
      <EquipmentFilters
        categories={categories}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Equipment Grid */}
      {equipmentLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : equipment.length === 0 ? (
        <Alert severity="info">
          No equipment found matching your filters. Try adjusting your search criteria.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {equipment.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <EquipmentCard
                equipment={item}
                onReserve={handleReserve}
                onViewDetails={handleViewDetails}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Results Count */}
      {!equipmentLoading && equipment.length > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Showing {equipment.length} equipment item{equipment.length !== 1 ? 's' : ''}
        </Typography>
      )}

      {/* Reservation Calendar - Shows when equipment is selected */}
      {selectedEquipment && (
        <Box sx={{ mt: 4 }}>
          <ReservationCalendar
            equipmentId={selectedEquipment.id}
            equipmentName={selectedEquipment.name}
            onTimeSlotSelect={handleTimeSlotSelect}
            existingReservations={[]}
          />
        </Box>
      )}

      {/* Reservation Form Modal */}
      {selectedEquipment && (
        <ReservationForm
          open={showReservationForm}
          onClose={handleReservationClose}
          onSuccess={handleReservationSuccess}
          equipment={selectedEquipment}
          selectedSlot={selectedSlot}
        />
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Box>
  );
};

export default EquipmentList;