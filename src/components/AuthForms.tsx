import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuth"
import { useI18n } from "@/hooks/useI18n"
import { useToast } from "@/hooks/use-toast"

export function AuthForms() {
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t('auth')}</CardTitle>
        <CardDescription>{t('authDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t('login')}</TabsTrigger>
            <TabsTrigger value="signup">{t('signUp')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
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
          
          <TabsContent value="signup">
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
              <Button type="submit" className="w-full">
                {t('signUp')}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}