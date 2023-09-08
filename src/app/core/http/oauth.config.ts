import { config } from "src/config";
export const oauthConfig = {
    issuer: 'https://your-oauth-provider.com',
    clientId: config.clientId,
    redirectUri: 'http://localhost:4200/callback',
    responseType: 'token',
    scope: 'openid profile email',
  };
