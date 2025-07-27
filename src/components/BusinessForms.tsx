import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/hooks/useI18n"
import { useToast } from "@/hooks/use-toast"
import { apiService } from "@/services/apiService"

export function BusinessForms() {
  const { t } = useI18n()
  const { toast } = useToast()
  
  const [businessData, setBusinessData] = useState({
    business_name: "",
    description: ""
  })

  const [serviceData, setServiceData] = useState({
    service_name: "",
    description: "",
    duration_minutes: 60,
    price_eur: 0
  })

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiService.createBusiness(businessData)
      toast({
        title: t('success'),
        description: t('businessCreated'),
      })
      setBusinessData({ business_name: "", description: "" })
    } catch (error) {
      toast({
        title: t('error'),
        description: t('businessCreateError'),
        variant: 'destructive',
      })
    }
  }

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiService.createService(serviceData)
      toast({
        title: t('success'),
        description: t('serviceCreated'),
      })
      setServiceData({
        service_name: "",
        description: "",
        duration_minutes: 60,
        price_eur: 0
      })
    } catch (error) {
      toast({
        title: t('error'),
        description: t('serviceCreateError'),
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('createBusiness')}</CardTitle>
          <CardDescription>{t('businessDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateBusiness} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">{t('businessName')}</Label>
              <Input
                id="business-name"
                value={businessData.business_name}
                onChange={(e) => setBusinessData({...businessData, business_name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-desc">{t('description')}</Label>
              <Textarea
                id="business-desc"
                value={businessData.description}
                onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                required
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full">
              {t('createBusiness')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('createService')}</CardTitle>
          <CardDescription>{t('serviceDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateService} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">{t('serviceName')}</Label>
              <Input
                id="service-name"
                value={serviceData.service_name}
                onChange={(e) => setServiceData({...serviceData, service_name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-desc">{t('description')}</Label>
              <Textarea
                id="service-desc"
                value={serviceData.description}
                onChange={(e) => setServiceData({...serviceData, description: e.target.value})}
                required
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">{t('duration')} ({t('minutes')})</Label>
                <Input
                  id="duration"
                  type="number"
                  value={serviceData.duration_minutes}
                  onChange={(e) => setServiceData({...serviceData, duration_minutes: parseInt(e.target.value)})}
                  required
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">{t('price')} (€)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={serviceData.price_eur}
                  onChange={(e) => setServiceData({...serviceData, price_eur: parseFloat(e.target.value)})}
                  required
                  min="0"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              {t('createService')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}