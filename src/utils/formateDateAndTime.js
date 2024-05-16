export default function formatDate(dateString) {
    // Create a Date object from the ISO date string
    const date = new Date(dateString);

    // Extract components
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getUTCFullYear()).slice(-2); // Get the last two digits of the year
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    // Determine AM/PM and convert hours to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert hour '0' to '12'
    const formattedHours = String(hours).padStart(2, '0');

    // Format the date and time
    const formattedDate = `${day}-${month}-${year}, ${formattedHours}:${minutes} ${ampm}`;
    
    return formattedDate;
}


