import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language, TranslationKeys } from '@/i18n/translations'

interface I18nContextType {
  language: Language
  t: (key: TranslationKeys) => string
  setLanguage: (lang: Language) => void
  availableLanguages: { code: Language; name: string; flag: string }[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language
    return saved && saved in translations ? saved : 'uk'
  })

  const availableLanguages = [
    { code: 'uk' as Language, name: 'Українська', flag: '🇺🇦' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' }
  ]

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || translations.uk[key] || key
  }

  return (
    <I18nContext.Provider value={{ language, t, setLanguage, availableLanguages }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}