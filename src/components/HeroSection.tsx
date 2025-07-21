import { Button } from "@/components/ui/button"
import { Calendar, Users, TrendingUp, ArrowRight } from "lucide-react"
import { useI18n } from "@/hooks/useI18n"

export function HeroSection() {
  const { t } = useI18n()
  
  return (
    <section className="relative bg-gradient-hero py-20 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          {t('heroTitle')}
          <span className="block bg-gradient-to-r from-secondary-light to-white bg-clip-text text-transparent">
            {t('heroTitleSpan')}
          </span>
        </h1>
        
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
          {t('heroDescription')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
          <Button size="xl" variant="hero">
            {t('startFree')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            {t('viewDemo')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 animate-fade-in">
            <Calendar className="w-8 h-8 text-secondary-light mb-4 mx-auto" />
            <h3 className="text-white font-semibold mb-2">{t('onlineCalendar')}</h3>
            <p className="text-white/80 text-sm">{t('onlineCalendarDesc')}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Users className="w-8 h-8 text-secondary-light mb-4 mx-auto" />
            <h3 className="text-white font-semibold mb-2">{t('clientManagement')}</h3>
            <p className="text-white/80 text-sm">{t('clientManagementDesc')}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <TrendingUp className="w-8 h-8 text-secondary-light mb-4 mx-auto" />
            <h3 className="text-white font-semibold mb-2">{t('aiAnalytics')}</h3>
            <p className="text-white/80 text-sm">{t('aiAnalyticsDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}