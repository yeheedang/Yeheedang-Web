const YEHIDANG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  '@id': 'https://yehidang.com',
  name: '예히당',
  alternateName: 'Yehidang',
  description:
    '15년 경력 셰프의 수제 화과자와 전통 디저트 답례품 전문 카페. 어버이날·스승의날·추석·설날·결혼식 답례품을 예히당에서 준비하세요.',
  url: 'https://yehidang.com',
  logo: 'https://yehidang.com/Logo.png',
  image: 'https://yehidang.com/og-image.png',
  telephone: '010-4927-9788',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '오패산로 37길 22 1층',
    addressLocality: '강북구 미아동',
    addressRegion: '서울특별시',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.6367,
    longitude: 127.0273,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '00:00',
      closes: '00:00',
    },
  ],
  servesCuisine: ['한식 디저트', '화과자', '전통 디저트'],
  priceRange: '₩₩',
  hasMap: 'https://naver.me/FBeewGHi',
  award: [
    '2023 대한민국 국제요리&제과경연대회 전시경연 대상',
    '2023 대한민국 국제요리&제과경연대회 찬요리 대상',
    '경기도지사 · 문화체육관광부 장관상',
    '2019 쌀요리경연대회 우수상',
  ],
  sameAs: ['https://naver.me/FBeewGHi'],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(YEHIDANG_SCHEMA) }}
    />
  )
}
