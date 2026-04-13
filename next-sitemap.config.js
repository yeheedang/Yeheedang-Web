/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yehidang.com',
  generateRobotsTxt: false,
  exclude: [
    '/manage',
    '/manage/*',
    '/api/*',
    '/*.xml',
    '/*.txt',
    '/*.webmanifest',
  ],
  generateIndexSitemap: false,
  trailingSlash: true,
}
