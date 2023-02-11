import { Inter } from '@next/font/google'
import { useEffect } from 'react'
import cn from 'classnames'

export const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '500'], variable: '--inter' })

export const fontsClassNames = cn(inter.variable, 'font-sans', inter.className)

export const useFonts = () => {
  useEffect(() => {
    document.querySelector('body')?.classList.add(fontsClassNames)
  }, [])
}
