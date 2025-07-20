import { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService';
import { Booking } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch bookings';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: {
    user_id: string;
    service_id: string;
    date_time: string;
  }) => {
    try {
      await apiService.createBooking(bookingData);
      await fetchBookings(); // Refresh the list
      toast({
        title: 'Success',
        description: 'Booking created successfully',
      });
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create booking';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  };

  const acceptBooking = async (id: string) => {
    try {
      await apiService.acceptBooking(id);
      await fetchBookings(); // Refresh the list
      toast({
        title: 'Success',
        description: 'Booking accepted successfully',
      });
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to accept booking';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      await apiService.cancelBooking(id);
      await fetchBookings(); // Refresh the list
      toast({
        title: 'Success',
        description: 'Booking cancelled successfully',
      });
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel booking';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      await apiService.deleteBooking(id);
      await fetchBookings(); // Refresh the list
      toast({
        title: 'Success',
        description: 'Booking deleted successfully',
      });
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete booking';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    acceptBooking,
    cancelBooking,
    deleteBooking,
  };
}