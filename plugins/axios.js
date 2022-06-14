export default function ({$axios, $cookies}) {
  $axios.onRequest(config => {
    //add headers with data to send on every request
    if (config && config.headers && config.headers.common) {
      config.headers.common['x-guest-uuid'] = $cookies.get('guest_uuid') || 'none';
    }
    return config;
  });
}
