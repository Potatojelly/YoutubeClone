import numeral from "numeral";

export default function changeUnit(number) {
    let print;

    print = numeral(number).format("0.0a");
    const lastChar = print.charAt(print.length-1);
    const upperLastChar = lastChar.toUpperCase();
    print = print.slice(0,-1) + upperLastChar;

    return print;
}

export function addNumFormat(number) {
    let print;

    print = numeral(number).format("0,0");

    return print;
}

export function getDate(datetime) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})/;
    const [, year, month, day] = datetime.match(regex);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
} 