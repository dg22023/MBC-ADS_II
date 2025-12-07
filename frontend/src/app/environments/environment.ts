export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  auth: {
    domain: 'dev-1rwd24w1u2co50m4.us.auth0.com', // tu dominio Auth0
    clientId: '4suGMaKauhByYLy4c6lh11ATeVgUtgvG', // tu clientId
    authorizationParams: {
      audience: 'https://dev-1rwd24w1u2co50m4.us.auth0.com/api/v2/', // tu audience
      redirect_uri: window.location.origin
    },
    namespace: 'https://minibooking.com/roles'
  }
};
