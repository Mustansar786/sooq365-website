/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  reactStrictMode: false,
  distDir: 'build',
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  },
  i18n: {
    locales: ['en', 'ar', 'ru','zh','th','si'],
    defaultLocale: 'en',
  },
  swcMinify: true,
}
