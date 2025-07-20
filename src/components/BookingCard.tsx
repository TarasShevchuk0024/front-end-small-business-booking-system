import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Euro } from "lucide-react"

interface BookingCardProps {
  id: string
  serviceName: string
  clientName: string
  dateTime: string
  duration: number
  price: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
}

export function BookingCard({ 
  serviceName, 
  clientName, 
  dateTime, 
  duration, 
  price, 
  status 
}: BookingCardProps) {
  const statusColors = {
    PENDING: 'bg-warning text-warning-foreground',
    CONFIRMED: 'bg-success text-success-foreground',
    CANCELLED: 'bg-destructive text-destructive-foreground'
  }

  const statusText = {
    PENDING: 'Очікує',
    CONFIRMED: 'Підтверджено',
    CANCELLED: 'Скасовано'
  }

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-card-soft hover:shadow-hover-lift transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground text-lg">{serviceName}</h3>
          <div className="flex items-center text-muted-foreground mt-1">
            <User className="w-4 h-4 mr-2" />
            <span>{clientName}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {statusText[status]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{new Date(dateTime).toLocaleDateString('uk-UA')}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{duration} хв</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-foreground font-semibold">
          <Euro className="w-4 h-4 mr-1" />
          <span>{price.toFixed(2)}</span>
        </div>
        
        {status === 'PENDING' && (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              Скасувати
            </Button>
            <Button size="sm" variant="success">
              Підтвердити
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}