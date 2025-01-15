export default async function getAdmin(att){
    try {
        const response = await fetch(`/administrator/${att}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        let userData = await response.json();
        return userData;
    } catch (err) {
        console.error('Failed to fetch user data:', err);
    }
}