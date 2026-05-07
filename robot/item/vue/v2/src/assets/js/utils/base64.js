let Base64 = require('js-base64').Base64;
export function encode(txt){
    return Base64.encode(txt);
}