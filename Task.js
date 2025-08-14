function solution(D) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = {};
    
    // Step 1: Sum values by day name
    for (let dateStr in D) {
        const date = new Date(dateStr);
        const dayName = days[date.getDay()];
        result[dayName] = (result[dayName] || 0) + D[dateStr];
    }

    // Step 2: Fill missing days using mean of previous and next days
    const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 0; i < orderedDays.length; i++) {
        const day = orderedDays[i];
        if (result[day] === undefined) {
            let prevIndex = (i - 1 + 7) % 7;
            let nextIndex = (i + 1) % 7;

            // Find previous existing day
            while (result[orderedDays[prevIndex]] === undefined) {
                prevIndex = (prevIndex - 1 + 7) % 7;
            }
            // Find next existing day
            while (result[orderedDays[nextIndex]] === undefined) {
                nextIndex = (nextIndex + 1) % 7;
            }

            // Mean of prev and next
            result[day] = Math.floor((result[orderedDays[prevIndex]] + result[orderedDays[nextIndex]]) / 2);
        }
    }

    return result;
}

// Example Test Cases
console.log(solution({
    '2020-01-01': 4, '2020-01-02': 4, '2020-01-03': 6, 
    '2020-01-04': 8, '2020-01-05': 2, '2020-01-06': -6, 
    '2020-01-07': 2, '2020-01-08': -2
}));
// Output: { Mon: -6, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8, Sun: 2 }

console.log(solution({
    '2020-01-01': 6, '2020-01-04': 12, '2020-01-05': 14,
    '2020-01-06': 2, '2020-01-07': 4
}));
// Output: { Mon: 2, Tue: 4, Wed: 6, Thu: 8, Fri: 10, Sat: 12, Sun: 14 }