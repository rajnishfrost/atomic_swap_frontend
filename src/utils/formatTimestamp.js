export function formatTimestamp(unixTimestamp) {
    // Convert the Unix timestamp to milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Extract components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Determine AM/PM and convert hours to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert hour '0' to '12'
    const formattedHours = String(hours).padStart(2, '0');

    // Format the date and time
    const formattedDate = `${day}-${month}-${year}, ${formattedHours}:${minutes} ${ampm}`;
    
    return formattedDate;
}

