export default async function getPermissions() {
    let userData = null;

    try {
        const response = await fetch('/administrator/permission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        userData = await response.json();
    } catch (err) {
        console.error('Failed to fetch user data:', err);
    }

    return userData;
}