export async function getAccessToken() {
    const url = 'https://dev-p0a4unf0uoxp5kfw.us.auth0.com/oauth/token';

    const data = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        audience: process.env.AUDIENCE,
        grant_type: 'client_credentials'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Access Token:', result);
        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } 
    }
}
