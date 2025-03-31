export const remainingTime = (date) => {
    const currentDate = new Date();
    const pastDate = new Date(date);
    const diffInMs = currentDate - pastDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 0) {
        return `${diffInDays} days ago`;
    } else {
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        if (diffInHours > 0) {
            return `${diffInHours} hours ago`;
        } else {
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
            return `${diffInMinutes} minutes ago`;
        }
    }
}