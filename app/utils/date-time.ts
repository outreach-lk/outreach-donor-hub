export function formatDate(date: string | Date) {
    const d = new Date(date)
    let month = `${d.getMonth() + 1}`,
        day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) 
        month = `0${month}`;
    if (day.length < 2) 
        day = `0${day}`;

    return [year, month, day].join('-');
}

/**
 * fixme: loses precision
 * @param object 
 */
export function getDateFromFirebaseDateTimeObject(object: {_seconds:number, _nanoseconds: number}):Date {
   return new Date(object._seconds*1000);
}   