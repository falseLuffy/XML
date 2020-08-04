import uuid from './uuid'
const tag = "<(\\w+)((\\s+([\\w][\\-\\d\\w]*?=(['\"])([^'\"<>]*?)\\5))*)*\\s*?>[^<>]*?<\\/\\1>"
const openTag = "<(\\w+)((\\s+([\\w][\\-\\d\\w]*?=(['\"])([^'\"<>]*?)\\5))*)*\\s*/>"
export default function parse (xmlString) {
  const tagMap = {}
  const tagg = new RegExp(tag, 'g')

  const a = stringReplace(new RegExp(openTag, 'g'), new RegExp(openTag), xmlString, tagMap)
  xmlString = a.xml
  const b = stringReplace(tagg, new RegExp(tag), xmlString, tagMap)
  xmlString = b.xml
  return Object.keys(tagMap).map(key => {
    const node = nodeParse(tagMap[key])
    return node
  })
}

function stringReplace (reg1, reg2, xmlString, tagMap) {
  while (reg1.test(xmlString)) {
    const matchList = xmlString.match(reg1)
    matchList.forEach(function (item) {
      const random = uuid()

      const identifier = '\\$\\{(.*?)\\}'
      const identifier_g = new RegExp(identifier, 'g')

      const children = (item.match(identifier_g) || []).map(item => {
        const uuid = (item.match(new RegExp(identifier)) || [])[1] || ''
        const child = tagMap[uuid]
        delete tagMap[uuid]
        return child
      })

      xmlString = xmlString.replace(item, `\$\{${random}\}`)

      tagMap[random] = {
        xml: item,
        children: children,
        tag: (item.match(new RegExp(reg2)) || [])[1] || ''
      }
    })
  }
  return {
    tagMap,
    xml: xmlString
  }
}

function nodeParse (data) {
  if (!data) return
  if (Array.isArray(data)) {
    data.map(item => {
      return nodeParse(item)
    })
  } else {
    const obj = {}
    const attr = {}
    const reg = "([\\w][\\-\\d\\w]*?)=((['\"])([^'\"<>]*?)\\3)"
    const attrString = (data.xml.match(new RegExp(tag)) || data.xml.match(new RegExp(openTag)) || [])[2] || '';
    (attrString.match(new RegExp(reg, 'g')) || [])
      .forEach(item => {
        const a = item.match(reg)
        attr[a[1]] = a[4]
      })
    obj[data.tag] = {
      ...attr,
      children: data.children.map(item => nodeParse(item))
    }
    return obj
  }
}
