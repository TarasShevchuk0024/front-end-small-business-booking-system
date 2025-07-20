import { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService';
import { Service } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await apiService.getServices();
      setServices(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services';
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

  const createService = async (serviceData: {
    service_name: string;
    description: string;
    duration_minutes: number;
    price_eur: number;
  }) => {
    try {
      await apiService.createService(serviceData);
      await fetchServices(); // Refresh the list
      toast({
        title: 'Success',
        description: 'Service created successfully',
      });
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create service';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateService = async (id: string, serviceData: Partial<{
    service_name: string;
    description: string;
    duration_minutes: number;
    price_eur: number;
  }>) => {
    try {
      await apiService.updateService(id, serviceData);
      await fetchServices(); // Refresh the list
      toast({
        title: 'Success',
        description: 'Service updated successfully',
      });
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update service';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteService = async (id: string) => {
    try {
      await apiService.deleteService(id);
      await fetchServices(); // Refresh the list
      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      });
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete service';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    fetchServices,
    createService,
    updateService,
    deleteService,
  };
}