let lz77_encoding_text_field = document.getElementById('lz77_encoding_text_field') as HTMLTextAreaElement
let buffer_size_field = document.getElementById('lz77_encoding_buffer_size_field') as HTMLInputElement

let lz77_decoding_text_field = document.getElementById('lz77_decoding_text_field') as HTMLTextAreaElement

function encode_text() {
    let code = LZ77.encode(lz77_encoding_text_field.value, parseInt(buffer_size_field.value, 10))
    let table_body = document.getElementById('lz77_encoding_table_body') as HTMLElement
    table_body.textContent = ''
    for (let i = 0; i < code.length; i++) {
        let row = document.createElement('tr')

        let step = document.createElement('td')
        step.textContent = (i + 1).toString()
        row.append(step)

        for (let value of Object.values(code[i])) {
            let cell = document.createElement('td')
            cell.textContent = value.toString()
            row.append(cell)
        }

        table_body.append(row)
    }
}

(lz77_encoding_text_field.oninput = buffer_size_field.onchange = encode_text)()

function decode() {
    let code_field = document.getElementById('lz77_decoding_code_field') as HTMLTextAreaElement
    let code: LZ77.InputNode[] = eval(`[${lz77_decoding_text_field.value}]`)
    code_field.value = LZ77.decode(code)
}

(lz77_decoding_text_field.oninput = decode)()