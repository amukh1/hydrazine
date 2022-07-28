class HydroGarbageCollector {
  options: any
  constructor(options?: any) {
    this.options = options
  }

  // Find and remove all the undefined values from the object within an array
  removeNull(obj: any) {
    for (const key in obj) {
      if (obj[key] == null || obj[key] == undefined) {
        delete obj[key]
      } else if (Array.isArray(obj[key])) {
        // Remove undefined values from the array
        obj[key] = obj[key].filter((item: any) => item != null)
      }
      if (typeof obj[key] === 'object') {
        this.removeNull(obj[key])
      }
    }
    return obj
  }

  clean(content: any) {
    return this.removeNull(content)
  }
}

export default HydroGarbageCollector
