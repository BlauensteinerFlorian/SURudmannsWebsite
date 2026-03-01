export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS', ['key1', 'key2', 'key3', 'key4']),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'super-secret-jwt-key-change-in-production'),
    },
  },
})
