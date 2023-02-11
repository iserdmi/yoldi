import { Inter } from '@next/font/google'
import cn from 'classnames'
import { useEffect } from 'react'

export const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '500'], variable: '--inter' })

export const fontsClassNames = cn(inter.variable, 'font-sans', inter.className)

export const useFonts = () => {
  useEffect(() => {
    document.querySelector('body')?.classList.add(...fontsClassNames.split(' '))
  }, [])
}
