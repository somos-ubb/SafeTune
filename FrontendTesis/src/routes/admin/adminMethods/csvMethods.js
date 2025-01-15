export default function downloadJSONAsCSV(jsonData, nombredata) {
    // Convert JSON data to CSV string
    const csvContent = jsonToCsv(jsonData);

    // Create a Blob object representing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nombredata}.csv`;
    // Simulate a click on the link to initiate the download
    link.click();
    // Revoke the temporary URL to avoid memory leaks
    window.URL.revokeObjectURL(url);
}

function jsonToCsv(jsonData) {
    // Get the headers from the first object in the JSON array
    const headers = Object.keys(jsonData[0]);

    // Create the CSV string with headers
    let csv = headers.join(',') + '\n';

    // Add data rows
    jsonData.forEach(function(row) {
        const data = headers.map(header => JSON.stringify(row[header])).join(',');
        csv += data + '\n';
    });

    return csv;
}