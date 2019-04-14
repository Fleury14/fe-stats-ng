function onlyFERaces(data) {
    data.items = data.items.filter(race => race.details.game === 'ff4fe')
    return data;
}

export { onlyFERaces };