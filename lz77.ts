namespace LZ77 {
    interface Node {
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
            if (match_index > -1) {
                let count = 0
                while (text.startsWith(substring)) {
                    count += 1
                    text = text.slice(substring.length)
                }
                length = substring.length * count
                break
            } else {
                substring = substring.slice(0, substring.length - 1)
            }
        }
        return {match_index, length}
    }

    export function encode(text: string, buffer_size = 5): Array<Node> {
        let code: Array<Node> = []
        let buffer = ''
        let current_index = 0
        while (current_index < text.length) {
            let remaining_text = text.slice(current_index);
            let {match_index, length} = find_match(buffer, text.slice(current_index))
            let offset = 0
            if (length > 0)
                offset = match_index - buffer.length

            current_index += length
            let next = text[current_index]
            if (next === undefined)
                next = ''

            code.push({buffer, remaining_text, offset, length, next})

            current_index += 1
            buffer = text.substring(current_index - buffer_size, current_index)
        }

        return code
    }

    export function decode(code: Array<Node>): string {
        return 'text'
    }
}