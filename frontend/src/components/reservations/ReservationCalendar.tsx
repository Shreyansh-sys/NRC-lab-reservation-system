import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Chip,
  Alert,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Today,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { TimeSlot } from '../../types/reservation';

interface ReservationCalendarProps {
  equipmentId: number;
  equipmentName: string;
  onTimeSlotSelect: (slot: TimeSlot) => void;
  existingReservations?: TimeSlot[];
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  equipmentId,
  equipmentName,
  onTimeSlotSelect,
  existingReservations = [],
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Generate time slots for the selected date (8 AM to 8 PM, 1-hour slots)
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 20;

    for (let hour = startHour; hour < endHour; hour++) {
      const start = selectedDate.hour(hour).minute(0).second(0);
      const end = selectedDate.hour(hour + 1).minute(0).second(0);

      // Check if this slot conflicts with existing reservations
      const conflictingReservation = existingReservations.find(reservation =>
        start.isBefore(reservation.end) && end.isAfter(reservation.start)
      );

      slots.push({
        start: start.toDate(),
        end: end.toDate(),
        available: !conflictingReservation,
        reservation: conflictingReservation as any, // 👈 FIX 1: Type assertion
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const navigateDate = (days: number) => {
    setSelectedDate(selectedDate.add(days, 'day'));
    setSelectedSlot(null);
  };

  const goToToday = () => {
    setSelectedDate(dayjs());
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      onTimeSlotSelect(slot);
    }
  };

  const formatTime = (date: Date) => {
    return dayjs(date).format('h:mm A');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Reserve: {equipmentName}
        </Typography>

        {/* Date Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Button
            startIcon={<ChevronLeft />}
            onClick={() => navigateDate(-1)}
          >
            Previous
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DatePicker
              value={selectedDate}
              onChange={(newDate) => newDate && setSelectedDate(newDate)}
              format="MMMM D, YYYY"
            />
            <Button
              startIcon={<Today />}
              onClick={goToToday}
              variant="outlined"
            >
              Today
            </Button>
          </Box>

          <Button
            endIcon={<ChevronRight />}
            onClick={() => navigateDate(1)}
          >
            Next
          </Button>
        </Box>

        {/* Selected Date */}
        <Typography variant="h6" align="center" gutterBottom>
          {selectedDate.format('dddd, MMMM D, YYYY')}
        </Typography>

        {/* Time Slots Grid */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {timeSlots.map((slot, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}> {/* 👈 FIX 2: MUI v6 syntax */}
              <Paper
                sx={{
                  p: 2,
                  cursor: slot.available ? 'pointer' : 'not-allowed',
                  backgroundColor: slot.available
                    ? selectedSlot?.start === slot.start ? 'primary.main' : 'background.paper'
                    : 'grey.100',
                  color: slot.available
                    ? selectedSlot?.start === slot.start ? 'primary.contrastText' : 'text.primary'
                    : 'grey.500',
                  border: selectedSlot?.start === slot.start ? 2 : 1,
                  borderColor: selectedSlot?.start === slot.start ? 'primary.main' : 'grey.300',
                  '&:hover': slot.available ? {
                    backgroundColor: selectedSlot?.start === slot.start ? 'primary.main' : 'primary.50',
                  } : {},
                }}
                onClick={() => handleSlotClick(slot)}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" fontWeight="medium">
                    {formatTime(slot.start)} - {formatTime(slot.end)}
                  </Typography>
                  {!slot.available && (
                    <Chip
                      label="Booked"
                      color="error"
                      size="small"
                    />
                  )}
                  {slot.available && selectedSlot?.start === slot.start && (
                    <Chip
                      label="Selected"
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>
                {slot.reservation && (
                  <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                    Reserved by: {slot.reservation.user_name}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Legend */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 16, height: 16, backgroundColor: 'primary.main', borderRadius: 1 }} />
            <Typography variant="caption">Selected</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 16, height: 16, backgroundColor: 'grey.100', border: 1, borderColor: 'grey.300', borderRadius: 1 }} />
            <Typography variant="caption">Available</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 16, height: 16, backgroundColor: 'error.main', borderRadius: 1 }} />
            <Typography variant="caption">Booked</Typography>
          </Box>
        </Box>

        {selectedSlot && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Time slot selected: {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}
          </Alert>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

export default ReservationCalendar;