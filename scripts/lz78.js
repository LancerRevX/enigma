"use strict";
var LZ78;
(function (LZ78) {
    function encode(text) {
        let code = [];
        let dictionary = [];
        while (text.length > 0) {
            text = text.replace(' ', '␣');
            let prefix = text[0];
            let index = -1;
            while (dictionary.includes(prefix)) {
                index = dictionary.indexOf(prefix);
                if (prefix.length == text.length) {
                    prefix += ' ';
                    break;
                }
                else {
                    prefix += text.slice(prefix.length, prefix.length + 1);
                }
            }
            let next = prefix.slice(-1);
            code.push({
                dictionary: dictionary.toString(),
                remaining_text: text,
                found_prefix: index != -1 ? dictionary[index] : '',
                dictionary_index: index + 1,
                next_character: next
            });
            text = text.slice(prefix.length);
            dictionary.push(prefix);
        }
        return code;
    }
    LZ78.encode = encode;
    function decode(code) {
        let text = '';
        let dictionary = [];
        for (let node of code) {
            let prefix = '';
            if (node[0] > 0) {
                prefix = dictionary[node[0] - 1];
            }
            prefix += node[1];
            text += prefix;
            dictionary.push(prefix);
        }
        return text;
    }
    LZ78.decode = decode;
})(LZ78 || (LZ78 = {}));
