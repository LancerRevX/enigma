let text_field = document.getElementById('lz77_encoding_text_field') as HTMLTextAreaElement
let buffer_size_field = document.getElementById('lz77_encoding_buffer_size_field') as HTMLInputElement

function encode_text() {
    let code = LZ77.encode(text_field.value, parseInt(buffer_size_field.value))
    let table_body = document.getElementById('lz77_encoding_table_body') as HTMLElement
    table_body.textContent = ''
    for (let i = 0; i < code.length; i++) {
        let row = document.createElement('tr')
        
        let step = document.createElement('td')
        step.textContent = (i + 1).toString()
        row.append(step)

        for (let value of Object.values(code[i])) {
            let cell = document.createElement('td')
            cell.textContent = value
            row.append(cell)
        }        

        table_body.append(row)
    }
}

(text_field.oninput = buffer_size_field.onchange = encode_text)()


// let decode_button = document.getElementById('decode_button') as HTMLButtonElement
// decode_button.onclick = function() {
//     text_field.value = LZ77.decode(code_field.value)
// }