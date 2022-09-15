const convertFirebaseTimestampToHoursAndMinuteForMessage = (timestamp) => {
    return new Date(timestamp.seconds * 1000).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
}

export { convertFirebaseTimestampToHoursAndMinuteForMessage };