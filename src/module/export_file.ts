export default (filename: string = 'hydrazine.hydro', contents: string) => {
  const file = new Blob([contents], {
    type: 'text/plain',
  })

  const element = document.createElement('a')
  element.href = URL.createObjectURL(file)
  element.download = filename

  document.body.appendChild(element)

  element.click()
  element.remove()

  return true
}
