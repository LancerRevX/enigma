"use strict";
var LZ77;
(function (LZ77) {
    function find_match(buffer, text) {
        let substring = text.slice(0, buffer.length);
        let match_index = -1;
        let length = 0;
        while (substring.length > 0) {
            match_index = buffer.indexOf(substring);
            if (match_index > -1) {
                while (text.startsWith(substring)) {
                    length += substring.length;
                    text = text.slice(substring.length);
                }
                while (substring.length > 0) {
                    if (text.startsWith(substring)) {
                        length += substring.length;
                        break;
                    }
                    else {
                        substring = substring.slice(0, -1);
                    }
                }
                break;
            }
            else {
                substring = substring.slice(0, -1);
            }
        }
        return { match_index, length };
    }
    function encode(text, buffer_size = 5) {
        let code = [];
        let buffer = '';
        let current_index = 0;
        while (current_index < text.length) {
            let remaining_text = text.slice(current_index);
            let { match_index, length } = find_match(buffer, text.slice(current_index));
            let offset = 0;
            if (length > 0)
                offset = buffer.length - match_index;
            current_index += length;
            let next = text[current_index];
            switch (next) {
                case undefined:
                    next = '';
                    break;
                case ' ':
                    next = '␣';
            }
            code.push({ buffer, remaining_text, offset, length, next });
            current_index += 1;
            buffer = text.substring(current_index - buffer_size, current_index);
        }
        return code;
    }
    LZ77.encode = encode;
    function decode(code) {
        let text = '';
        for (let node of code) {
            let substring = text.slice(-node[0]);
            while (node[1] > 0) {
                text += substring.slice(0, node[1]);
                node[1] -= substring.length;
            }
            text += node[2];
        }
        return text;
    }
    LZ77.decode = decode;
})(LZ77 || (LZ77 = {}));
