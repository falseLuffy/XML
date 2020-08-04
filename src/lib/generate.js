export default function generateXML (data, tag = 'pointer') {
  const XMLHeader = '<?xml version=\'1.0\' encoding=\'utf-8\'?>'

  return `${XMLHeader}<root>${generate(data, tag)}</root>`
}
function generate (json, tag = 'pointer') {
  var XMLString = ''
  if (Array.isArray(json)) {
    json.forEach(item => {
      XMLString += generate(item, tag)
    })
  } else {
    XMLString += node(tag, json)
  }
  return XMLString
}

function node (tag, data) {
  const dataKey = Object.keys(data)
  const attrString = dataKey
    .filter(key => typeof data[key] !== 'object')
    .map(key => {
      return `${key}="${data[key]}"`
    }).join(' ')
  const children = dataKey
    .filter(key => typeof data[key] === 'object')
    .map(key => {
      return generate(data[key], key)
    })
  return `<${tag} ${attrString}>${children}</${tag}>`
}
