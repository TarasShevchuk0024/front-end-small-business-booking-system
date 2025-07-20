import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react"

// Mock data for bookings
const mockBookings = [
  { id: 1, time: '09:00', service: 'Стрижка', client: 'Іван Петренко', status: 'CONFIRMED' },
  { id: 2, time: '10:30', service: 'Фарбування', client: 'Марія Коваленко', status: 'PENDING' },
  { id: 3, time: '14:00', service: 'Манікюр', client: 'Олена Сидоренко', status: 'CONFIRMED' },
  { id: 4, time: '16:30', service: 'Масаж', client: 'Андрій Мельник', status: 'CONFIRMED' },
]

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const statusColors = {
    PENDING: 'bg-warning/20 border-warning text-warning-foreground',
    CONFIRMED: 'bg-success/20 border-success text-success-foreground',
    CANCELLED: 'bg-destructive/20 border-destructive text-destructive-foreground'
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Календар бронювань
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-4">
            {selectedDate.toLocaleDateString('uk-UA', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const day = i - 6 // Start from previous month
          const isToday = day === new Date().getDate()
          const isSelected = day === selectedDate.getDate()
          const hasBookings = [15, 16, 18, 22].includes(day)
          
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(new Date(2024, 2, day))}
              className={`
                p-2 text-sm rounded-lg transition-all duration-200 relative
                ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}
                ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}
                ${day <= 0 || day > 31 ? 'text-muted-foreground/50' : 'text-foreground'}
              `}
            >
              {day > 0 && day <= 31 ? day : ''}
              {hasBookings && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-secondary rounded-full"></div>
              )}
            </button>
          )
        })}
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Сьогоднішні бронювання
        </h3>
        
        <div className="space-y-3">
          {mockBookings.map((booking) => (
            <div 
              key={booking.id} 
              className={`p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-card-soft ${statusColors[booking.status as keyof typeof statusColors]}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-foreground">{booking.time}</span>
                    <span className="text-foreground">{booking.service}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{booking.client}</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">Редагувати</Button>
                  <Button size="sm" variant="outline">Деталі</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockBookings.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Немає бронювань на сьогодні</p>
          </div>
        )}
      </div>
    </div>
  )
}