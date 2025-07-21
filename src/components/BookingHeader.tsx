import { Button } from "@/components/ui/button"
import { Calendar, Users, Settings, Bell } from "lucide-react"
import { useI18n } from "@/hooks/useI18n"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

export function BookingHeader() {
  const { t } = useI18n()
  
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">BookEasy</h1>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('dashboard')}
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('calendar')}
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('services')}
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('clients')}
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            {t('profile')}
          </Button>
        </div>
      </div>
    </header>
  )
}