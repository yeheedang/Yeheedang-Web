import type { Metadata } from 'next'
import { Noto_Serif_KR, Nanum_Myeongjo } from 'next/font/google'
import EmotionRegistry from '@/lib/emotion-registry'
import './globals.css'

const notoSerifKR = Noto_Serif_KR({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '예히당 | 한국 전통 디저트 카페',
  description: '한국의 전통과 현대가 어우러진 디저트 카페, 예히당',
  icons: '/favico.png',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoSerifKR.variable} ${nanumMyeongjo.variable}`}>
      <body>
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  )
}
