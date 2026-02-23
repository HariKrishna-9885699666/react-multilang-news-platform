import axios from 'axios';
import config from '../config';

const createApiClient = (baseURL, apiKey, keyParam = 'apiKey') => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use((requestConfig) => {
    if (apiKey) {
      requestConfig.params = {
        ...requestConfig.params,
        [keyParam]: apiKey,
      };
    }
    return requestConfig;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 429) {
          throw new Error('API_LIMIT_EXCEEDED');
        } else if (status === 401) {
          throw new Error('INVALID_API_KEY');
        } else if (status >= 500) {
          throw new Error('SERVER_ERROR');
        }
      } else if (error.request) {
        throw new Error('NETWORK_ERROR');
      }
      throw error;
    }
  );

  return client;
};

export const newsApiClient = createApiClient(
  config.api_endpoints.newsApi,
  config.api.newsApiKey,
  'apiKey'
);

export const gNewsClient = createApiClient(
  config.api_endpoints.gNews,
  config.api.gNewsApiKey,
  'apikey'
);

export default { newsApiClient, gNewsClient };
