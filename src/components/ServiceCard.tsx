import { Button } from "@/components/ui/button"
import { Clock, Euro, Star, Edit, Trash2 } from "lucide-react"
import { Service } from "@/types/api"
import { useI18n } from "@/hooks/useI18n"

interface ServiceCardProps extends Service {
  rating?: number
  onBook?: () => void
  onEdit?: () => void
  onDelete?: () => void
  showActions?: boolean
}

export function ServiceCard({ 
  service_name, 
  description, 
  duration_minutes, 
  price_eur, 
  rating = 4.8,
  onBook,
  onEdit,
  onDelete,
  showActions = false
}: ServiceCardProps) {
  const { t } = useI18n()
  
  return (
    <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card-soft hover:shadow-hover-lift transition-all duration-300 group animate-scale-in">
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
            {service_name}
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
          <span className="text-sm">{duration_minutes} {t('minutes')}</span>
        </div>
        <div className="flex items-center text-foreground font-semibold text-lg">
          <span>{t('euro')}{price_eur.toFixed(2)}</span>
        </div>
      </div>

      {showActions ? (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-1" />
            Редагувати
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            <Trash2 className="w-4 h-4 mr-1" />
            {t('deleteService')}
          </Button>
        </div>
      ) : (
        <Button 
          onClick={onBook}
          className="w-full" 
          variant="booking"
        >
          {t('book')}
        </Button>
      )}
    </div>
  )
}