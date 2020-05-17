namespace LZ78 {
    export type OutputNode = {
        dictionary: string,
        remaining_text: string,
        found_prefix: string,
        dictionary_index: number,
        next_character: string
    }

    export type InputNode = [number, string]

    export function encode(text: string): OutputNode[] {
        let code: OutputNode[] = []
        let dictionary: string[] = []

        while (text.length > 0) {
            text = text.replace(' ', '␣')
            let prefix = text[0]
            let index = -1
            while (dictionary.includes(prefix)) {
                index = dictionary.indexOf(prefix)
                if (prefix.length == text.length) {
                    prefix += ' '
                    break
                } else {
                    prefix += text.slice(prefix.length, prefix.length + 1)
                }
            }

            let next = prefix.slice(-1)

            code.push({
                dictionary: dictionary.toString(),
                remaining_text: text,
                found_prefix: index != -1 ? dictionary[index] : '',
                dictionary_index: index + 1,
                next_character: next
            })

            text = text.slice(prefix.length)
            dictionary.push(prefix)
        }

        return code
    }

    export function decode(code: InputNode[]): string {
        let text = ''
        let dictionary: string[] = []
        for (let node of code) {
            let prefix = ''
            if (node[0] > 0) {
                prefix = dictionary[node[0] - 1]
            }
            prefix += node[1]
            text += prefix
            dictionary.push(prefix)
        }
        return text
    }
}