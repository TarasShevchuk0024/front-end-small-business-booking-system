import { BookingHeader } from "@/components/BookingHeader"
import { HeroSection } from "@/components/HeroSection"
import { BookingCalendar } from "@/components/BookingCalendar"
import { ServiceCard } from "@/components/ServiceCard"
import { BookingCard } from "@/components/BookingCard"
import { Button } from "@/components/ui/button"
import { Plus, BarChart3, Users, Calendar } from "lucide-react"

// Mock data
const mockServices = [
  {
    id: '1',
    serviceName: 'Чоловіча стрижка',
    description: 'Професійна стрижка з укладкою. Включає миття голови та консультацію щодо стилю.',
    duration: 45,
    price: 25.00,
    rating: 4.9
  },
  {
    id: '2', 
    serviceName: 'Жіноче фарбування',
    description: 'Професійне фарбування волосся з використанням якісних фарб. Консультація колориста.',
    duration: 120,
    price: 85.00,
    rating: 4.8
  },
  {
    id: '3',
    serviceName: 'Манікюр класичний',
    description: 'Класичний манікюр з покриттям гель-лаком. Тривалість до 3 тижнів.',
    duration: 60,
    price: 35.00,
    rating: 4.7
  }
]

const mockBookings = [
  {
    id: '1',
    serviceName: 'Чоловіча стрижка',
    clientName: 'Іван Петренко',
    dateTime: '2024-03-15T10:00:00',
    duration: 45,
    price: 25.00,
    status: 'PENDING' as const
  },
  {
    id: '2',
    serviceName: 'Жіноче фарбування', 
    clientName: 'Марія Коваленко',
    dateTime: '2024-03-15T14:30:00',
    duration: 120,
    price: 85.00,
    status: 'CONFIRMED' as const
  },
  {
    id: '3',
    serviceName: 'Манікюр класичний',
    clientName: 'Олена Сидоренко',
    dateTime: '2024-03-15T16:00:00',
    duration: 60,
    price: 35.00,
    status: 'CONFIRMED' as const
  }
]

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BookingHeader />
      
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Dashboard Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-primary p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Всього бронювань</p>
                <p className="text-2xl font-bold">127</p>
                <p className="text-white/80 text-xs">+12% за місяць</p>
              </div>
              <Calendar className="w-8 h-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-gradient-success p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Підтверджено</p>
                <p className="text-2xl font-bold">98</p>
                <p className="text-white/80 text-xs">77% від загальної кількості</p>
              </div>
              <BarChart3 className="w-8 h-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-xl shadow-card-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Активні клієнти</p>
                <p className="text-2xl font-bold text-foreground">45</p>
                <p className="text-muted-foreground text-xs">За останній тиждень</p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-xl shadow-card-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Дохід</p>
                <p className="text-2xl font-bold text-foreground">€2,350</p>
                <p className="text-success text-xs">+8.2% за місяць</p>
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
              {mockServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Останні бронювання</h2>
              <Button variant="outline">Переглянути всі</Button>
            </div>
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <BookingCard key={booking.id} {...booking} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
