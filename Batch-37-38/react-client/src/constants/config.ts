
export default {
  urlAPI: window.location.href.includes('vercel') ?  'https://demo-deploy-nodejs-api-v5.vercel.app/api' :  'http://localhost:8080/api'
}