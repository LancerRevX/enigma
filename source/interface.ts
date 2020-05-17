let lz77_encoding_text_field = document.getElementById(
    'lz77_encoding_text_field'
) as HTMLTextAreaElement
let lz77_buffer_size_field = document.getElementById(
    'lz77_encoding_buffer_size_field'
) as HTMLInputElement
(
    lz77_encoding_text_field.oninput =
    lz77_buffer_size_field.onchange =
    () => {
        let code = LZ77.encode(
            lz77_encoding_text_field.value,
            parseInt(lz77_buffer_size_field.value, 10)
        )

        let table_body = document.getElementById(
            'lz77_encoding_table_body'
        ) as HTMLElement
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
)()

let lz77_decoding_text_field = document.getElementById(
    'lz77_decoding_text_field'
) as HTMLTextAreaElement
(
    lz77_decoding_text_field.oninput =
    () => {
        let code_field = document.getElementById('lz77_decoding_code_field') as HTMLTextAreaElement
        let code: LZ77.InputNode[] = eval(`[${lz77_decoding_text_field.value}]`)
        code_field.value = LZ77.decode(code)
    }
)()

let lz78_encoding_text_field = document.getElementById(
    'lz78_encoding_text_field'
) as HTMLTextAreaElement
(
    lz78_encoding_text_field.oninput =
    () => {
        let code = LZ78.encode(lz78_encoding_text_field.value)

        let table_body = document.getElementById(
            'lz78_encoding_table_body'
        ) as HTMLElement
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
)()

let lz78_decoding_text_field = document.getElementById(
    'lz78_decoding_text_field'
) as HTMLTextAreaElement
(
    lz78_decoding_text_field.oninput =
    () => {
        let code_field = document.getElementById(
            'lz78_decoding_code_field'
        ) as HTMLTextAreaElement
        let code: LZ78.InputNode[] = eval(
            `[${lz78_decoding_text_field.value}]
        `)
        code_field.value = LZ78.decode(code)
    }
)()