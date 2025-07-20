import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Euro } from "lucide-react"
import { Booking } from "@/types/api"

interface BookingCardProps extends Booking {
  serviceName?: string
  clientName?: string
  onAccept?: () => void
  onCancel?: () => void
  onDelete?: () => void
}

export function BookingCard({ 
  serviceName = "Service", 
  clientName = "Client", 
  date_time, 
  status,
  onAccept,
  onCancel,
  onDelete
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
          <span className="text-sm">{new Date(date_time).toLocaleDateString('uk-UA')}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{new Date(date_time).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          ID: {status === 'CONFIRMED' ? '✓' : status === 'CANCELLED' ? '✗' : '⏳'} 
          {new Date(date_time).toLocaleString('uk-UA')}
        </div>
        
        {status === 'PENDING' && (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={onCancel}>
              Скасувати
            </Button>
            <Button size="sm" variant="success" onClick={onAccept}>
              Підтвердити
            </Button>
          </div>
        )}
        
        {status === 'CONFIRMED' && (
          <Button size="sm" variant="outline" onClick={onCancel}>
            Скасувати
          </Button>
        )}
        
        {status === 'CANCELLED' && (
          <Button size="sm" variant="destructive" onClick={onDelete}>
            Видалити
          </Button>
        )}
      </div>
    </div>
  )
}