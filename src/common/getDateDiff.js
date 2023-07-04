const MIN = (1000 * 60 * 60);
const HOUR = (1000 * 60 * 60 * 24);
const DAY = (1000 * 60 * 60 * 24 * 7);
const WEEK = (1000 * 60 * 60 * 24 * 7 * 4);
const MONTH = (1000 * 60 * 60 * 24 * 7 * 4 * 12);

export default function getDateDiff(publishedAt) {
    const today = new Date();
    const publishedDate = new Date(publishedAt);
    const diff = Math.abs(publishedDate.getTime()-today.getTime());
    let result = {};
    let print;
    if (diff < MIN) { //min
        result = Math.ceil(diff / (1000 * 60));
        result === 1 ? print = `${result} minute ago` : print = `${result} minutes ago`
    } else if(diff < HOUR) { //hour
        result = Math.ceil(diff / MIN);
        result === 1 ? print = `${result} hour ago` : print = `${result} hours ago`
    } else if(diff < DAY) { //days
        result = Math.ceil(diff / HOUR);
        result === 1 ? print = `${result} day ago` : print = `${result} days ago`
    } else if(diff < WEEK) {//week
        result = Math.ceil(diff / DAY);
        result === 1 ? print = `${result} week ago` : print = `${result} weeks ago`
    } else if(diff < MONTH) {// month
        result = Math.ceil(diff / WEEK);
        result === 1 ? print = `${result} month ago` : print = `${result} monthss ago`
    } else { //year
        result = Math.ceil(diff / MONTH);
        result === 1 ? print = `${result} year ago` : print = `${result} years ago`
    }
    return print;
};