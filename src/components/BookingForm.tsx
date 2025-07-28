import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/hooks/useI18n"
import { useToast } from "@/hooks/use-toast"
import { useServices } from "@/hooks/useServices"
import { useBookings } from "@/hooks/useBookings"
import { useAuth } from "@/hooks/useAuth"
import { Service } from "@/types/api"

export function BookingForm({ selectedServiceId, onSuccess }: { selectedServiceId?: string; onSuccess?: () => void }) {
  const { t } = useI18n()
  const { toast } = useToast()
  const { services } = useServices()
  const { createBooking } = useBookings()
  const { user } = useAuth()
  
  const [bookingData, setBookingData] = useState({
    service_id: "",
    date_time: ""
  })

  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    if (bookingData.service_id) {
      const service = services.find(s => s.id === bookingData.service_id)
      setSelectedService(service || null)
    }
  }, [bookingData.service_id, services])

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: t('error'),
        description: t('loginRequired'),
        variant: 'destructive',
      })
      return
    }

    const success = await createBooking({
      user_id: user.id,
      service_id: bookingData.service_id,
      date_time: bookingData.date_time
    })

    if (success) {
      setBookingData({ service_id: "", date_time: "" })
      setSelectedService(null)
    }
  }

  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return ""
    const date = new Date(dateTimeString)
    return date.toLocaleString('uk-UA')
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t('createBooking')}</CardTitle>
        <CardDescription>{t('bookingDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateBooking} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service-select">{t('selectService')}</Label>
            <Select 
              value={bookingData.service_id} 
              onValueChange={(value) => setBookingData({...bookingData, service_id: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectService')} />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.service_name} - €{service.price_eur} ({service.duration_minutes} {t('minutes')})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedService && (
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium">{selectedService.service_name}</h4>
              <p className="text-sm text-muted-foreground">{selectedService.description}</p>
              <div className="flex justify-between text-sm mt-2">
                <span>{selectedService.duration_minutes} {t('minutes')}</span>
                <span>€{selectedService.price_eur}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="datetime">{t('dateTime')}</Label>
            <Input
              id="datetime"
              type="datetime-local"
              value={bookingData.date_time}
              onChange={(e) => setBookingData({...bookingData, date_time: e.target.value})}
              required
            />
          </div>

          {bookingData.date_time && (
            <div className="text-sm text-muted-foreground">
              {t('selectedTime')}: {formatDateTime(bookingData.date_time)}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={!user}>
            {user ? t('createBooking') : t('loginRequired')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}