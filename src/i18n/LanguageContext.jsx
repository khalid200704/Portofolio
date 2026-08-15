import { createContext, useContext, useEffect, useState } from 'react'
import * as contentEn from '../data/content.en'
import * as contentId from '../data/content.id'
import { ui } from './ui'

const CONTENT = { en: contentEn, id: contentId }
const STORAGE_KEY = 'portfolio-locale'

const LanguageContext = createContext(null)

function detectInitialLocale() {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'id') return stored
  return 'en'
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(detectInitialLocale)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (next) => setLocaleState(next === 'id' ? 'id' : 'en')
  const toggleLocale = () => setLocaleState(l => (l === 'en' ? 'id' : 'en'))

  const value = {
    locale,
    setLocale,
    toggleLocale,
    ...CONTENT[locale],
    ui: ui[locale],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
