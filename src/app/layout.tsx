import type { Metadata } from 'next'
import { Noto_Serif_KR, Nanum_Myeongjo } from 'next/font/google'
import EmotionRegistry from '@/lib/emotion-registry'
import { JsonLd } from '@/lib/JsonLd'
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

const SITE_URL = 'https://yehidang.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '예히당 | 한국 전통 디저트 카페',
    template: '%s | 예히당',
  },
  description: '15년 경력 셰프의 수제 화과자와 전통 디저트 답례품 전문 카페. 어버이날·스승의날·추석·설날·결혼식 답례품을 예히당에서 준비하세요.',
  keywords: ['예히당', '화과자', '전통 디저트', '답례품', '수제 디저트', '한국 전통 카페', '미아사거리 카페', '강북구 카페', '화과자 답례품', '전통 답례품'],
  authors: [{ name: '예히당' }],
  creator: '예히당',
  publisher: '예히당',
  icons: {
    icon: '/favico.png',
    apple: '/favico.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '예히당',
    title: '예히당 | 한국 전통 디저트 카페',
    description: '15년 경력 셰프의 수제 화과자와 전통 디저트 답례품 전문 카페. 소중한 순간을 예히당과 함께하세요.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '예히당 - 한국 전통 디저트 카페',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '예히당 | 한국 전통 디저트 카페',
    description: '15년 경력 셰프의 수제 화과자와 전통 디저트 답례품 전문 카페.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    other: {
      'naver-site-verification': 'b53baa7a900fbe189628e1212d4ea74b77293f4b',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoSerifKR.variable} ${nanumMyeongjo.variable}`}>
      <body>
        <JsonLd />
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  )
}
