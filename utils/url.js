/* eslint-disable no-prototype-builtins */
export const buildQuery = (obj) => {
  const str = []

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((element, index) => {
          for (const key2 in element) {
            if (typeof element[key2] === 'object') {
              Object.entries(element[key2]).forEach(item => {
                str.push(`${encodeURIComponent(key)}[${index}][${key2}][${item[0]}]=${item[1]}`)
              })
            } else {
              str.push(`${encodeURIComponent(key)}[${index}][${key2}]=${element[key2]}`)
            }
          }
        })
      } else {
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      }
    }
  }

  return str.join('&')
}
