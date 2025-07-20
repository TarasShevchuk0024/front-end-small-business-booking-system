import { useEffect, useState } from "react"
import { BookingHeader } from "@/components/BookingHeader"
import { HeroSection } from "@/components/HeroSection"
import { BookingCalendar } from "@/components/BookingCalendar"
import { ServiceCard } from "@/components/ServiceCard"
import { BookingCard } from "@/components/BookingCard"
import { Button } from "@/components/ui/button"
import { Plus, BarChart3, Users, Calendar } from "lucide-react"
import { useServices } from "@/hooks/useServices"
import { useBookings } from "@/hooks/useBookings"
import { useAuth } from "@/hooks/useAuth"
import { Service, Booking } from "@/types/api"

const Index = () => {
  const { services, loading: servicesLoading, createService, deleteService } = useServices()
  const { bookings, loading: bookingsLoading, acceptBooking, cancelBooking, deleteBooking } = useBookings()
  const { user, isAuthenticated } = useAuth()
  
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
      console.log('Please login to book a service')
      return
    }
    
    // In real app, this would open a booking modal
    console.log('Booking service:', service.service_name)
  }

  const handleServiceDelete = async (serviceId: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю послугу?')) {
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
    if (window.confirm('Ви впевнені, що хочете видалити це бронювання?')) {
      await deleteBooking(bookingId)
    }
  }

  if (servicesLoading || bookingsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Завантаження...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background">
      <BookingHeader />
      
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-primary p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Всього бронювань</p>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
                <p className="text-white/80 text-xs">Загальна кількість</p>
              </div>
              <Calendar className="w-8 h-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-gradient-success p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Підтверджено</p>
                <p className="text-2xl font-bold">{stats.confirmedBookings}</p>
                <p className="text-white/80 text-xs">{stats.totalBookings > 0 ? Math.round((stats.confirmedBookings / stats.totalBookings) * 100) : 0}% від загальної кількості</p>
              </div>
              <BarChart3 className="w-8 h-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-xl shadow-card-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Активні клієнти</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeClients}</p>
                <p className="text-muted-foreground text-xs">Унікальні клієнти</p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-xl shadow-card-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Дохід</p>
                <p className="text-2xl font-bold text-foreground">€{stats.revenue.toFixed(2)}</p>
                <p className="text-success text-xs">Підтверджені бронювання</p>
              </div>
              <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                <span className="text-secondary font-bold">€</span>
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
              <h2 className="text-2xl font-semibold text-foreground">Ваші послуги</h2>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Додати послугу
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
                  <p>Немає послуг. Додайте першу послугу!</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Bookings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Останні бронювання</h2>
              <Button variant="outline">Переглянути всі</Button>
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
                  <p>Немає бронювань</p>
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
