require('dotenv').config();
const axios = require('axios');

const API_URL = 'https://dbac9484-5a36-439b-aa4e-fd6d586d51f2.eu-central-1-0.aws.cloud.qdrant.io:6333';
const QDRANT_API_KEY = process.env.API_KEY;

if (!QDRANT_API_KEY) {
    console.error('API key is missing. Please check your .env file.');
    process.exit(1);
}

const fetchData = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'api-key': QDRANT_API_KEY
            }
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
};

fetchData();
