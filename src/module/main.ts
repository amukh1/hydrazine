class Master {
  randomString(
    length: number = 5,
    charSet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  ) {
    const result: string[] = []
    while (length--) {
      result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)))
    }

    return result.join('')
  }
}

export default new Master()
