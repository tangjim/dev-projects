export function required(txt, rule) {
    return txt.match(/^\s*$/);
}
export function email(txt, rule) {
    return (txt.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) === -1);
}