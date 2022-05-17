export default function (url) {
    if (url) return `http://localhost:4000/${url.slice(6)}`
    else return "";
}