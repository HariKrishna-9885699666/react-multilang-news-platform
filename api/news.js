import axios from 'axios';

export default async function handler(req, res) {
  const { endpoint = 'top-headlines', ...params } = req.query;
  const apiKey = process.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'NewsAPI key not configured on server' });
  }

  try {
    const response = await axios.get(`https://newsapi.org/v2/${endpoint}`, {
      params: {
        ...params,
        apiKey,
      },
      headers: {
        'User-Agent': 'MultiLangNewsPlatform/2.0',
      },
    });

    // Set CORS headers for Vercel
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Error fetching from NewsAPI';
    return res.status(status).json({ error: message });
  }
}
