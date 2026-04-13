/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yehidang.com',
  generateRobotsTxt: true,
  exclude: [
    '/manage',
    '/manage/*',
    '/api/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/manage', '/api'],
      },
    ],
  },
}
