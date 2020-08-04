export default function generateXML (data) {
  const XMLHeader = '<?xml version=\'1.0\' encoding=\'utf-8\'?>'

  return `${XMLHeader}${generate(data)}`
}
function generate (json, tag) {
  var XMLString = ''
  if (Array.isArray(json)) {
    json.forEach(item => {
      XMLString += generate(item, Object.keys(item)[0])
    })
  } else {
    XMLString += node(tag, json[tag])
  }
  return XMLString
}

function node (tag, data) {
  const dataKey = Object.keys(data)
  let attrString = dataKey
    .filter(key => typeof data[key] !== 'object')
    .map(key => {
      return `${key}="${data[key]}"`
    }).join(' ')
  attrString = attrString ? ' ' + attrString : ''
  const children = dataKey
    .filter(key => typeof data[key] === 'object')
    .map(key => {
      return generate(data[key], key)
    })
  return tag !== 'children' ? data.children && data.children.length ? `<${tag}${attrString}>${children}</${tag}>` : `<${tag}${attrString} />` : children
}
