namespace LZ77 {

    export type InputNode = [number, number, string]

    export type OutputNode = {
        buffer: string
        remaining_text: string
        offset: number
        length: number
        next: string
    }

    function find_match(buffer: string, text: string): {match_index: number, length: number} {
        let substring = text.slice(0, buffer.length)
        let match_index = -1
        let length = 0
        while (substring.length > 0) {
            match_index = buffer.indexOf(substring)
            if (match_index != -1) {
                if (buffer.endsWith(substring)) {
                    while (text.startsWith(substring)) {
                        length += substring.length
                        text = text.slice(substring.length)
                    }
                    while (substring.length > 0) {
                        if (text.startsWith(substring)) {
                            length += substring.length
                            break
                        } else {
                            substring = substring.slice(0, -1)
                        }
                    }
                } else {
                    length = substring.length
                }
                break
            } else {
                substring = substring.slice(0, -1)
            }
        }
        return {match_index, length}
    }

    export function encode(text: string, buffer_size = 5): OutputNode[] {
        let code: OutputNode[] = []
        let buffer = ''
        let current_index = 0
        while (current_index < text.length) {
            let remaining_text = text.slice(current_index)
            let {match_index, length} = find_match(buffer, text.slice(current_index))
            let offset = 0
            if (length > 0)
                offset = buffer.length - match_index

            current_index += length
            let next = text[current_index]
            switch (next) {
                case undefined:
                    next = ''
                    break
                case ' ':
                    next = '␣'
            }

            code.push({buffer, remaining_text, offset, length, next})

            current_index += 1
            buffer = text.substring(current_index - buffer_size, current_index)
        }

        return code
    }

    export function decode(code: InputNode[]): string {
        let text = ''
        for (let node of code) {
            let substring = text.slice(-node[0])
            while (node[1] > 0) {
                text += substring.slice(0, node[1])
                node[1] -= substring.length
            }
            text += node[2]
        }

        return text
    }
}