import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, BarChart3, Users, Calendar, Building, Settings } from "lucide-react"
import { useServices } from "@/hooks/useServices"
import { useBookings } from "@/hooks/useBookings"
import { useAuth } from "@/hooks/useAuth"
import { useI18n } from "@/hooks/useI18n"
import { AdminHeader } from "@/components/AdminHeader"
import { BusinessForms } from "@/components/BusinessForms"
import { ServiceCard } from "@/components/ServiceCard"
import { BookingCard } from "@/components/BookingCard"
import { Service, Booking } from "@/types/api"

export default function AdminDashboard() {
  const { services, loading: servicesLoading, deleteService } = useServices()
  const { bookings, loading: bookingsLoading, acceptBooking, cancelBooking, deleteBooking } = useBookings()
  const { user } = useAuth()
  const { t } = useI18n()
  
  const [showBusinessForm, setShowBusinessForm] = useState(false)

  // Demo stats - in real app these would come from API
  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'CONFIRMED').length,
    activeClients: new Set(bookings.map(b => b.user_id)).size,
    revenue: bookings
      .filter(b => b.status === 'CONFIRMED')
      .reduce((sum, booking) => {
        const service = services.find(s => s.id === booking.service_id)
        return sum + (service?.price_eur || 0)
      }, 0)
  }

  const handleServiceBook = (service: Service) => {
    console.log('Admin viewing service:', service.service_name)
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
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('adminDashboard')}
          </h1>
          <p className="text-muted-foreground">
            {t('adminDashboardDescription')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{t('totalBookings')}</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  <p className="text-white/80 text-xs">{t('totalCount')}</p>
                </div>
                <Calendar className="w-8 h-8 text-white/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-success text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{t('confirmed')}</p>
                  <p className="text-2xl font-bold">{stats.confirmedBookings}</p>
                  <p className="text-white/80 text-xs">
                    {stats.totalBookings > 0 ? Math.round((stats.confirmedBookings / stats.totalBookings) * 100) : 0}% 
                    {t('ofTotal')}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-white/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{t('activeClients')}</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activeClients}</p>
                  <p className="text-muted-foreground text-xs">{t('uniqueClients')}</p>
                </div>
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{t('revenue')}</p>
                  <p className="text-2xl font-bold text-foreground">{t('euro')}{stats.revenue.toFixed(2)}</p>
                  <p className="text-success text-xs">{t('confirmed')} {t('bookings')}</p>
                </div>
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <span className="text-secondary font-bold">{t('euro')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="services">{t('services')}</TabsTrigger>
            <TabsTrigger value="bookings">{t('bookings')}</TabsTrigger>
            <TabsTrigger value="clients">{t('clients')}</TabsTrigger>
            <TabsTrigger value="business">{t('business')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Services */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('recentServices')}</CardTitle>
                  <CardDescription>{t('yourLatestServices')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.slice(0, 3).map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{service.service_name}</p>
                          <p className="text-sm text-muted-foreground">{service.duration_minutes} {t('minutes')}</p>
                        </div>
                        <Badge>{t('euro')}{service.price_eur}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('recentBookings')}</CardTitle>
                  <CardDescription>{t('latestBookingRequests')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{t('service')} #{booking.service_id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.date_time).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={booking.status === 'CONFIRMED' ? 'default' : 'secondary'}>
                          {booking.status === 'CONFIRMED' ? t('confirmed') : booking.status === 'PENDING' ? t('pending') : t('cancelled')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{t('manageServices')}</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t('addService')}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  {...service} 
                  onBook={() => handleServiceBook(service)}
                  onDelete={() => handleServiceDelete(service.id)}
                  showActions={true}
                />
              ))}
              {services.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    <p>{t('noServices')}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('manageBookings')}</h2>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  {...booking} 
                  serviceName={services.find(s => s.id === booking.service_id)?.service_name || `Service ${booking.service_id}`}
                  clientName={`User ${booking.user_id}`}
                  onAccept={() => handleBookingAccept(booking.id)}
                  onCancel={() => handleBookingCancel(booking.id)}
                  onDelete={() => handleBookingDelete(booking.id)}
                />
              ))}
              {bookings.length === 0 && (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    <p>{t('noBookings')}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('clientManagement')}</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>{t('clientManagementComingSoon')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{t('businessManagement')}</h2>
              <Button onClick={() => setShowBusinessForm(!showBusinessForm)}>
                <Building className="w-4 h-4 mr-2" />
                {t('manageBusiness')}
              </Button>
            </div>
            {showBusinessForm && <BusinessForms />}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}