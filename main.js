// Initialize Airtable with your API key and base ID
const AIRTABLE_API_KEY = 'patSGxISHqbsu2smh.6541dcfa2275fafb34bfbb32e3f78a80520241002330fed893906115f9b743f5'; // Your actual API key
const BASE_ID = 'appACwov7Hwlcq6Sk'; // Ensure this is the correct Base ID
const TABLE_NAME = 'Cheat'; // Table name in Airtable

async function createRecord(data) {
    // Prepare the API URL for Airtable
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

    // Prepare the data to send to Airtable
    const recordData = {
        fields: {
            Text: data // Use 'Text' as the field name to store the input value
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recordData)
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('Created record with ID:', jsonResponse.id);
        } else {
            const errorResponse = await response.json(); // Log the error response for debugging
            console.error('Error response from Airtable:', errorResponse);
            throw new Error(`Failed to create record: ${errorResponse.message}`);
        }
    } catch (err) {
        console.error('Error creating record:', err);
        alert('Error sending data: ' + err.message);
    }
}

// Function to handle form submission
async function script() {
    const searchBar = document.getElementById('searchid');
    const inputValue = searchBar.value;

    if (inputValue) {
        await createRecord(inputValue); // Pass the input value to the createRecord function
    } else {
        alert('Please enter a value');
    }
}

// Expose the script function globally for the HTML button to access
window.script = script;
