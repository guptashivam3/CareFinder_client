document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the query string parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const xmlData = params.get('data'); // Get the XML data
    const hospitals = JSON.parse(params.get('hospitals')) || []; // Get the hospitals data

    // Display the hospitals information
    let output = '<h2>Hospitals:</h2><ul>';
    hospitals.forEach(hospital => {
        output += `<li>`;
        output += `<strong>${hospital.name}</strong><br>`;
        output += `<p><strong>Address:</strong> ${hospital.address}, ${hospital.city}, ${hospital.state} ${hospital.zip}</p>`;
        output += `<p><strong>Phone:</strong> ${hospital.phone}</p>`;
        output += `<p><strong>Type:</strong> ${hospital.type}</p>`;
        output += `<p><strong>Ownership:</strong> ${hospital.ownership}</p>`;
        output += `<p><strong>Emergency Services:</strong> ${hospital.emergency}</p>`;
        output += `</li>`;
    });
    output += '</ul>';

    document.getElementById('output').innerHTML = output; // Display the output in the HTML

    // Display the raw XML data
    //document.getElementById('xmlDisplay').textContent = xmlData; // Show raw XML data
});

// Function to go back to the main search page
function goBack() {
    window.history.back();
}
