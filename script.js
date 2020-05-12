"use strict";
let text_field = document.getElementById('text_field');
let code_field = document.getElementById('code_field');
let buffer_size_field = document.getElementById('buffer_size_field');
let encode_button = document.getElementById('encode_button');
encode_button.onclick = function () {
    let code = LZ77.encode(text_field.value, parseInt(buffer_size_field.value));
    let table_body = document.getElementById('code_table_body');
    table_body.textContent = '';
    for (let i = 0; i < code.length; i++) {
        let row = document.createElement('tr');
        let step = document.createElement('td');
        step.textContent = (i + 1).toString();
        row.append(step);
        for (let value of Object.values(code[i])) {
            let cell = document.createElement('td');
            cell.textContent = value;
            row.append(cell);
        }
        table_body.append(row);
    }
};
// let decode_button = document.getElementById('decode_button') as HTMLButtonElement
// decode_button.onclick = function() {
//     text_field.value = LZ77.decode(code_field.value)
// }
