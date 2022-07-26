export default function main(str: string) {
  const date = new Date()

  let library = {
    $DATE_LOCASETIMESTRING: date.toLocaleTimeString(),
    $DATE_TIMESTRING: date.toTimeString(),
    $DATE_LOCALEDATESTRING: date.toLocaleDateString(),
    $DATE_DATESTRING: date.toDateString(),
    $PROCESS_ID: process.pid,
  }

  let m = Object.keys(library)
  let final: string = str

  for (let i = 0; i < m.length; i++) {
    const key = m[i]
    const val = library[key]
    final += final.replace(`$${key}`, val)
  }

  return final
}
