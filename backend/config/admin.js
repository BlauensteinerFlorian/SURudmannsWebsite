export default () => ({
  auth: {
    secret: 'super-secret-jwt-key-change-in-production',
  },
  apiToken: {
    salt: 'rwrLp2dEMT9HjTiFVuGRxw==',
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    }
  }
})
