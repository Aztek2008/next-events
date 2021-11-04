import axios from 'axios';

const CLIENT_ID = process.env.NEXT_PUBLIC_EVENT_API_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_EVENT_API_APP_SECRET;

const QUERY_URL = `https://api.seatgeek.com/2/events?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

export const apiFetching = async () => {
  try {
    const response = await axios.get(QUERY_URL);
    return response.data.events;
  } catch (error) {
    console.error(error);
  }
};
