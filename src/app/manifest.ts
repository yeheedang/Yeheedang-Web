import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '예히당 | 한국 전통 디저트 카페',
    short_name: '예히당',
    description: '한국의 전통과 현대가 어우러진 디저트 카페',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f5',
    theme_color: '#4a3728',
    lang: 'ko',
    icons: [
      {
        src: '/favico.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
