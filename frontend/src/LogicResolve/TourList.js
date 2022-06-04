export const SortTour = (dataSort, option) => {
    const dir = option.slice(-3);
    const att = option.slice(0,-4);
    return dataSort.sort((a,b) => {
        if(dir==="asc"){
            if(att === 'timeStart') return new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime();
            else if(att === 'price') return a.price*(1-a.discount) - b.price*(1-b.discount);
                else return a.tourName.localeCompare(b.tourName);
        }else{
            if(att === 'timeStart') return new Date(b.timeStart).getTime() - new Date(a.timeStart).getTime();
            else if(att === 'price') return b.price*(1-b.discount) - a.price*(1-a.discount);
                else return b.tourName.localeCompare(a.tourName);
        }
    })
}