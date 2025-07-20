import { Button } from "@/components/ui/button"
import { Clock, Euro, Star } from "lucide-react"

interface ServiceCardProps {
  id: string
  serviceName: string
  description: string
  duration: number
  price: number
  rating?: number
  onBook?: () => void
}

export function ServiceCard({ 
  serviceName, 
  description, 
  duration, 
  price, 
  rating = 4.8,
  onBook 
}: ServiceCardProps) {
  return (
    <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card-soft hover:shadow-hover-lift transition-all duration-300 group animate-scale-in">
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
            {serviceName}
          </h3>
          <div className="flex items-center text-warning">
            <Star className="w-4 h-4 fill-current mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{duration} хвилин</span>
        </div>
        <div className="flex items-center text-foreground font-semibold text-lg">
          <Euro className="w-5 h-5 mr-1" />
          <span>{price.toFixed(2)}</span>
        </div>
      </div>

      <Button 
        onClick={onBook}
        className="w-full" 
        variant="booking"
      >
        Забронювати
      </Button>
    </div>
  )
}