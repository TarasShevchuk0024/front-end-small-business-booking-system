import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MapPin, User, Calendar } from "lucide-react"
import { useServices } from "@/hooks/useServices"
import { useBookings } from "@/hooks/useBookings"
import { useAuth } from "@/hooks/useAuth"
import { useI18n } from "@/hooks/useI18n"
import { Service, Booking } from "@/types/api"
import { BookingForm } from "@/components/BookingForm"
import { ClientHeader } from "@/components/ClientHeader"

export default function ClientDashboard() {
  const { services } = useServices()
  const { bookings } = useBookings()
  const { user } = useAuth()
  const { t } = useI18n()
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  // Filter bookings for current user
  const userBookings = bookings.filter(booking => booking.user_id === user?.id)

  const handleServiceBook = (service: Service) => {
    setSelectedService(service)
    setShowBookingForm(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('welcome')}, {user?.first_name}!
          </h1>
          <p className="text-muted-foreground">
            {t('clientDashboardDescription')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('totalBookings')}</p>
                  <p className="text-2xl font-bold">{userBookings.length}</p>
                </div>
                <CalendarDays className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('confirmed')}</p>
                  <p className="text-2xl font-bold">
                    {userBookings.filter(b => b.status === 'CONFIRMED').length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('pending')}</p>
                  <p className="text-2xl font-bold">
                    {userBookings.filter(b => b.status === 'PENDING').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Services */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">{t('availableServices')}</h2>
            <div className="space-y-4">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{service.service_name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{t('euro')}{service.price_eur}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration_minutes} {t('minutes')}
                      </div>
                      <Button onClick={() => handleServiceBook(service)}>
                        {t('book')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {services.length === 0 && (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    <p>{t('noServicesAvailable')}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* User Bookings */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">{t('myBookings')}</h2>
            <div className="space-y-4">
              {userBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{t('service')} #{booking.service_id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.date_time).toLocaleString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status === 'CONFIRMED' ? t('confirmed') : booking.status === 'PENDING' ? t('pending') : t('cancelled')}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-1" />
                      {t('bookingId')}: {booking.id.slice(0, 8)}...
                    </div>
                  </CardContent>
                </Card>
              ))}
              {userBookings.length === 0 && (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    <p>{t('noBookings')}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Booking Form Modal */}
      {showBookingForm && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{t('bookService')}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowBookingForm(false)}
              >
                ✕
              </Button>
            </div>
            <BookingForm 
              selectedServiceId={selectedService.id}
              onSuccess={() => setShowBookingForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}