function sortRacesByTime (races) {
    const sortedRaces = races.items.sort((race1, race2) => {
        const date1 = new Date(race1.details.created);
        const date2 = new Date(race2.details.created);
        return date2.getTime() - date1.getTime();
    });
    return sortedRaces;
}

export { sortRacesByTime };