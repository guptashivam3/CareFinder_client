console.log("App is loaded");  // Check if JS file is loaded

const baseURL = "http://www.knautzfamilywi.com/CareFinder-1.0.0/api"; // Base URL for the CareFinder API
const proxyURL = 'https://cors-anywhere.herokuapp.com/';  // CORS proxy

// Function to update the placeholder based on the selected search type
function updateInputPlaceholder() {
    const searchType = document.getElementById('searchType').value;
    const input = document.getElementById('searchInput');

    switch (searchType) {
        case 'id':
            input.placeholder = "Enter Hospital ID";
            break;
        case 'state':
            input.placeholder = "Enter State Name";
            break;
        case 'city':
            input.placeholder = "Enter City Name";
            break;
        case 'name':
            input.placeholder = "Enter Hospital Name";
            break;
        default:
            input.placeholder = "Enter Search Term";
    }
}

// Function to handle the search request
function searchHospitals() {
    const searchType = document.getElementById('searchType').value;
    const searchParam = document.getElementById('searchInput').value;
    
    if (!searchParam) {
        alert("Please enter a valid search term");
        return;
    }

    let url = '';
    // Build the appropriate URL based on the selected search type
    switch (searchType) {
        case 'id':
            url = `${proxyURL}${baseURL}/hospitals/id/${searchParam}`;
            break;
        case 'state':
            url = `${proxyURL}${baseURL}/hospitals/state/${searchParam}`;
            break;
        case 'city':
            url = `${proxyURL}${baseURL}/hospitals/city/${searchParam}`;
            break;
        case 'name':
            url = `${proxyURL}${baseURL}/hospitals/name/${searchParam}`;
            break;
    }

    console.log("Fetching data from:", url);  // Log the request URL

    // Fetch data from the CareFinder API with CORS proxy
    fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': '3a7bbbf229beb5f9d5c851356af76d0c',  // Replace with your actual API key
            'Accept': 'application/xml'
        }
    })
    .then(response => {
        console.log("Response received:", response);
        return response.text();
    })
    .then(data => {
        console.log("Data:", data);
        displayData(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Change background color on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const body = document.body;

    if (scrollPosition > 100 && scrollPosition < 150) {
        body.classList.add('scroll-bg');  // First color
        body.classList.remove('scroll-bg-2', 'scroll-bg-3');  // Remove other classes
    } else if (scrollPosition >= 150 && scrollPosition < 200) {
        body.classList.add('scroll-bg-2');  // Second color
        body.classList.remove('scroll-bg', 'scroll-bg-3');  // Remove other classes
    } else if (scrollPosition >= 250) {
        body.classList.add('scroll-bg-3');  // Third color
        body.classList.remove('scroll-bg', 'scroll-bg-2');  // Remove other classes
    } else {
        body.classList.remove('scroll-bg', 'scroll-bg-2', 'scroll-bg-3');  // Reset classes
    }
});

// Function to display the XML data in a readable format
function displayData(xmlData) {
    console.log("Parsing XML Data:", xmlData);  // Log raw XML data

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlData, 'application/xml');
    
    // Extract all hospital items from the XML
    const hospitals = xml.getElementsByTagName('item');

    if (hospitals.length === 0) {
        console.log("No hospitals found");
        document.getElementById('output').innerHTML = '<p>No hospitals found for your search.</p>';
        return;
    }

    // Create output for displaying the data
    let output = '<h2>Hospitals:</h2><ul>';  // Start an unordered list

    // Loop through each hospital item and extract data
    for (let i = 0; i < hospitals.length; i++) {
        const hospital = hospitals[i];
        const name = hospital.getElementsByTagName('hospital_name')[0]?.textContent || "Unknown";
        const address = hospital.getElementsByTagName('address')[0]?.textContent || "No address available";
        const city = hospital.getElementsByTagName('city')[0]?.textContent || "Unknown city";
        const state = hospital.getElementsByTagName('state')[0]?.textContent || "Unknown state";
        const zip = hospital.getElementsByTagName('zip_code')[0]?.textContent || "Unknown zip code";
        const phone = hospital.getElementsByTagName('phone_number')[0]?.textContent || "No phone available";
        const type = hospital.getElementsByTagName('hospital_type')[0]?.textContent || "Unknown type";
        const ownership = hospital.getElementsByTagName('hospital_ownership')[0]?.textContent || "Unknown ownership";
        const emergency = hospital.getElementsByTagName('emergency_services')[0]?.textContent === "true" ? "Yes" : "No";

        // Add hospital details to output
        output += `<li>`;
        output += `<strong>${name}</strong><br>`;
        output += `<p><strong>Address:</strong> ${address}, ${city}, ${state} ${zip}</p>`;
        output += `<p><strong>Phone:</strong> ${phone}</p>`;
        output += `<p><strong>Type:</strong> ${type}</p>`;
        output += `<p><strong>Ownership:</strong> ${ownership}</p>`;
        output += `<p><strong>Emergency Services:</strong> ${emergency}</p>`;
        output += `</li>`;
    }

    output += '</ul>';  // End the unordered list

    console.log("Displaying data:", output);  // Log formatted output
    document.getElementById('output').innerHTML = output;  // Display the output in the HTML

    // Display the raw XML data
    document.getElementById('xmlDisplay').textContent = xmlData;  // Show raw XML data
}
