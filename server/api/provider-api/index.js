/* eslint-disable no-console */
import axios from 'axios';

async function getProviderToken() {
  try {
    const {
      AUTH_PROVIDER_URL,
      AUTH_PROVIDER_REALM,
      AUTH_PROVIDER_CLIENT_ID,
      AUTH_PROVIDER_CLIENT_SECRET
    } = process.env;

    const url = `${AUTH_PROVIDER_URL}/realms/${AUTH_PROVIDER_REALM}/protocol/openid-connect/token`;

    const response = await axios.post(
      url,
      {
        grant_type: 'client_credentials',
        client_id: AUTH_PROVIDER_CLIENT_ID,
        client_secret: AUTH_PROVIDER_CLIENT_SECRET
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function removeAccountFromProvider(userId) {
  try {
    const token = await getProviderToken();

    if (!token) {
      throw new Error('Token not found');
    }

    const url = `${process.env.AUTH_PROVIDER_URL}/admin/realms/${process.env.AUTH_PROVIDER_REALM}/users/${userId}`;

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    return error;
  }
}
