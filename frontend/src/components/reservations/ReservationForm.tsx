import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Equipment } from '../../types/equipment';
import { TimeSlot, CreateReservationData } from '../../types/reservation';
import { reservationService } from '../../services/reservations';
import dayjs from 'dayjs';

interface ReservationFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  equipment: Equipment;
  selectedSlot: TimeSlot | null;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  open,
  onClose,
  onSuccess,
  equipment,
  selectedSlot,
}) => {
  const [formData, setFormData] = useState({
    purpose: '',
    is_recurring: false,
    recurring_pattern: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setLoading(true);
    setError('');

    try {
      const reservationData: CreateReservationData = {
        equipment: equipment.id,
        start_time: selectedSlot.start.toISOString(),
        end_time: selectedSlot.end.toISOString(),
        purpose: formData.purpose,
        is_recurring: formData.is_recurring,
        recurring_pattern: formData.is_recurring ? formData.recurring_pattern : undefined,
      };

      await reservationService.createReservation(reservationData);
      onSuccess();
      onClose();
      // Reset form
      setFormData({ purpose: '', is_recurring: false, recurring_pattern: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create reservation');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setError('');
    setFormData({ purpose: '', is_recurring: false, recurring_pattern: '' });
  };

  if (!selectedSlot) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Reserve {equipment.name}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          {/* Reservation Details */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Reservation Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Date:</strong> {dayjs(selectedSlot.start).format('MMMM D, YYYY')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Time:</strong> {dayjs(selectedSlot.start).format('h:mm A')} - {dayjs(selectedSlot.end).format('h:mm A')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Location:</strong> {equipment.location}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Purpose Field */}
          <TextField
            label="Purpose of Reservation"
            multiline
            rows={3}
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            required
            fullWidth
            margin="normal"
            placeholder="Please describe what you'll be using this equipment for..."
          />

          {/* Training Warning */}
          {equipment.requires_training && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This equipment requires special training. Please ensure you have completed the required training before use.
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !formData.purpose.trim()}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirm Reservation'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ReservationForm;