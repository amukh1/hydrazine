export default function main(str: string, options: any) {
  let m = Object.keys(options)
  let final: string = str

  for (let i = 0; i < m.length; i++) {
    const key = m[i]
    const val = options[key]
    final += final.replace(`$${key}`, val)
  }

  return final
}
