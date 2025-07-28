import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useAuth } from "@/hooks/useAuth"
import { useI18n } from "@/hooks/useI18n"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Users, BarChart3, CheckCircle } from "lucide-react"

export default function Home() {
  const { t } = useI18n()
  const { login, signUp } = useAuth()
  const { toast } = useToast()
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  
  const [signUpData, setSignUpData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    type: "USER" as "USER" | "ADMIN"
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(loginData)
    if (success) {
      toast({
        title: t('success'),
        description: t('loginSuccess'),
      })
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await signUp(signUpData)
    if (success) {
      toast({
        title: t('success'),
        description: t('signUpSuccess'),
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">BookingSystem</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('bookingSystemTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('bookingSystemSubtitle')}
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('easyBooking')}</h3>
              <p className="text-muted-foreground">{t('easyBookingDesc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('clientManagement')}</h3>
              <p className="text-muted-foreground">{t('clientManagementDesc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('analytics')}</h3>
              <p className="text-muted-foreground">{t('analyticsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-xl border-0 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('getStarted')}</CardTitle>
              <CardDescription>{t('authDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t('login')}</TabsTrigger>
                  <TabsTrigger value="signup">{t('signUp')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">{t('email')}</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">{t('password')}</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {t('login')}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-firstname">{t('firstName')}</Label>
                        <Input
                          id="signup-firstname"
                          value={signUpData.first_name}
                          onChange={(e) => setSignUpData({...signUpData, first_name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-lastname">{t('lastName')}</Label>
                        <Input
                          id="signup-lastname"
                          value={signUpData.last_name}
                          onChange={(e) => setSignUpData({...signUpData, last_name: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">{t('email')}</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">{t('phone')}</Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        value={signUpData.phone_number}
                        onChange={(e) => setSignUpData({...signUpData, phone_number: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">{t('password')}</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="user-type">{t('userType')}</Label>
                      <Select 
                        value={signUpData.type} 
                        onValueChange={(value: "USER" | "ADMIN") => 
                          setSignUpData({...signUpData, type: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">{t('client')}</SelectItem>
                          <SelectItem value="ADMIN">{t('businessOwner')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      {t('signUp')}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-muted/30">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 BookingSystem. {t('allRightsReserved')}</p>
        </div>
      </footer>
    </div>
  )
}