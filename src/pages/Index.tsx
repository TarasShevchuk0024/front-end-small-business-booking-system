import { useEffect, useState } from "react"
import { BookingHeader } from "@/components/BookingHeader"
import { HeroSection } from "@/components/HeroSection"
import { BookingCalendar } from "@/components/BookingCalendar"
import { ServiceCard } from "@/components/ServiceCard"
import { BookingCard } from "@/components/BookingCard"
import { AuthForms } from "@/components/AuthForms"
import { BusinessForms } from "@/components/BusinessForms"
import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { Plus, BarChart3, Users, Calendar } from "lucide-react"
import { useServices } from "@/hooks/useServices"
import { useBookings } from "@/hooks/useBookings"
import { useAuth } from "@/hooks/useAuth"
import { useI18n } from "@/hooks/useI18n"
import { Service, Booking } from "@/types/api"

const Index = () => {
  const { services, loading: servicesLoading, createService, deleteService } = useServices()
  const { bookings, loading: bookingsLoading, acceptBooking, cancelBooking, deleteBooking } = useBookings()
  const { user, isAuthenticated } = useAuth()
  const { t } = useI18n()
  
  // Demo stats - in real app these would come from API
  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'CONFIRMED').length,
    activeClients: new Set(bookings.map(b => b.user_id)).size,
    revenue: bookings
      .filter(b => b.status === 'CONFIRMED')
      .reduce((sum, booking) => {
        // In real app, you'd join with service data to get price
        return sum + 45.00; // Demo price
      }, 0)
  }

  const handleServiceBook = (service: Service) => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      console.log(t('loginRequired'))
      return
    }
    
    // In real app, this would open a booking modal
    console.log('Booking service:', service.service_name)
  }

  const handleServiceDelete = async (serviceId: string) => {
    if (window.confirm(t('confirmDeleteService'))) {
      await deleteService(serviceId)
    }
  }

  const handleBookingAccept = async (bookingId: string) => {
    await acceptBooking(bookingId)
  }

  const handleBookingCancel = async (bookingId: string) => {
    await cancelBooking(bookingId)
  }

  const handleBookingDelete = async (bookingId: string) => {
    if (window.confirm(t('confirmDeleteBooking'))) {
      await deleteBooking(bookingId)
    }
  }

  if (servicesLoading || bookingsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background">
      <BookingHeader />
      
      <HeroSection />
      
      {/* Authentication Section */}
      {!isAuthenticated && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('auth')}</h2>
              <p className="text-muted-foreground">{t('authDescription')}</p>
            </div>
            <AuthForms />
          </div>
        </section>
      )}

      {/* Business Management Section - Only for authenticated users */}
      {isAuthenticated && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('manageBusiness')}</h2>
              <p className="text-muted-foreground">{t('manageBusinessDescription')}</p>
            </div>
            <BusinessForms />
          </div>
        </section>
      )}

      {/* Booking Form Section - Only for authenticated users */}
      {isAuthenticated && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('createBooking')}</h2>
              <p className="text-muted-foreground">{t('bookingDescription')}</p>
            </div>
            <BookingForm />
          </div>
        </section>
      )}
      
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-primary p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{t('totalBookings')}</p>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
                <p className="text-white/80 text-xs">{t('totalCount')}</p>
              </div>
              <Calendar className="w-8 h-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-gradient-success p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{t('confirmed')}</p>
                <p className="text-2xl font-bold">{stats.confirmedBookings}</p>
                <p className="text-white/80 text-xs">{stats.totalBookings > 0 ? Math.round((stats.confirmedBookings / stats.totalBookings) * 100) : 0}% від {t('totalCount')}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-xl shadow-card-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{t('activeClients')}</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeClients}</p>
                <p className="text-muted-foreground text-xs">{t('uniqueClients')}</p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-xl shadow-card-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{t('revenue')}</p>
                <p className="text-2xl font-bold text-foreground">{t('euro')}{stats.revenue.toFixed(2)}</p>
                <p className="text-success text-xs">{t('confirmed')} бронювання</p>
              </div>
              <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                <span className="text-secondary font-bold">{t('euro')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section>
          <BookingCalendar />
        </section>

        {/* Services & Bookings */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Services */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">{t('yourServices')}</h2>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                {t('addService')}
              </Button>
            </div>
            <div className="space-y-4">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  {...service} 
                  onBook={() => handleServiceBook(service)}
                  onDelete={() => handleServiceDelete(service.id)}
                  showActions={user?.type === 'ADMIN'}
                />
              ))}
              {services.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>{t('noServices')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Bookings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">{t('recentBookings')}</h2>
              <Button variant="outline">{t('viewAll')}</Button>
            </div>
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  {...booking} 
                  serviceName={`Service ${booking.service_id}`}
                  clientName={`User ${booking.user_id}`}
                  onAccept={() => handleBookingAccept(booking.id)}
                  onCancel={() => handleBookingCancel(booking.id)}
                  onDelete={() => handleBookingDelete(booking.id)}
                />
              ))}
              {bookings.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>{t('noBookings')}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
