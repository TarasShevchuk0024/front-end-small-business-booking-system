import { Button } from "@/components/ui/button"
import { Calendar, Users, Settings, Bell } from "lucide-react"

export function BookingHeader() {
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
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Календар
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Послуги
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Клієнти
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Профіль
          </Button>
        </div>
      </div>
    </header>
  )
}