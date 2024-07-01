function getTimeDiffInMins(time1, time2) {
    // Function to parse time strings into Date objects
    function parseTime(timeStr) {
        let [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');

        if (modifier === 'pm' && hours !== '12') {
            hours = parseInt(hours, 10) + 12;
        }
        if (modifier === 'am' && hours === '12') {
            hours = 0;
        }

        return new Date(1970, 0, 1, hours, minutes);
    }

    let date1 = parseTime(time1);
    let date2 = parseTime(time2);

    // Calculate the difference in milliseconds
    let diffInMs = Math.abs(date2 - date1);

    // Convert milliseconds to minutes
    let diffInMinutes = Math.floor(diffInMs / 1000 / 60);

    return `${Math.floor(diffInMinutes/60)} h ${diffInMinutes%60} mins`;
}

export default getTimeDiffInMins;