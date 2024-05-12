export function formatDate(date) {
    // Get day, month, year, hours, minutes, seconds
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    let year = String(date.getFullYear()).slice(-2); // Extract last two digits
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    // Combine date and time components
    let formattedDate = `${day}-${month}-${year} ${hours}-${minutes}-${seconds}`;

    return formattedDate;
}

