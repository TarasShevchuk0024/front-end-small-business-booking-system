import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useAuth } from "@/hooks/useAuth"
import { useI18n } from "@/hooks/useI18n"
import { Calendar, LogOut, Shield } from "lucide-react"

export function AdminHeader() {
  const { user, logout } = useAuth()
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">BookingSystem</span>
          <span className="text-sm text-muted-foreground">| {t('adminPanel')}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          
          <div className="flex items-center space-x-2 text-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span>{user?.first_name} {user?.last_name}</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {t('admin')}
            </span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            {t('logout')}
          </Button>
        </div>
      </div>
    </header>
  )
}