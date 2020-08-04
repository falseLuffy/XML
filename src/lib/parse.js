import uuid from './uuid'
const tag = /<(\w+)([^<>]*?)>[^<>]*?<\/\1>/

export default function parse (xmlString) {
  const tagMap = {}
  const tagg = /<(\w+)([^<>]*?)>[^<>]*?<\/\1>/g

  while (tagg.test(xmlString)) {
    const matchList = xmlString.match(tagg)
    matchList.forEach(function (item) {
      const random = uuid()

      const identifier = /\$\{(.*?)\}/
      const identifierg = /\$\{(.*?)\}/g

      const children = (item.match(identifierg) || []).map(item => {
        const uuid = (item.match(identifier) || [])[1] || ''
        const child = tagMap[uuid]
        delete tagMap[uuid]
        return child
      })

      xmlString = xmlString.replace(item, `\$\{${random}\}`)

      tagMap[random] = {
        xml: item,
        children: children,
        tag: (item.match(tag) || [])[1] || ''
      }
    })
  }

  return Object.keys(tagMap).map(key => {
    const node = nodeParse(tagMap[key])
    return node
  })
}

function nodeParse (data) {
  if (Array.isArray(data)) {
    data.map(item => {
      return nodeParse(item)
    })
  } else {
    const obj = {}
    const attr = {};
    (((data.xml || '').match(tag) || [])[2] || '').split(' ')
      .filter(item => item).map(item => item.split('=')).forEach(item => {
        attr[item[0]] = item[1]
      })
    obj[data.tag] = {
      ...attr,
      children: data.children.map(item => nodeParse(item))
    }
    return obj
  }
}

// var str = '<?xml version=\'1.0\' encoding=\'utf-8\'?><root><pointer><dev nPclType="1"></dev><dev nPclType="1" nPclType2="1"></dev><dev nPclType="1"></dev><protocol nMinAddr="3"><point nDevIndex="11"></point></protocol></pointer></root>'

// parse(str)
// console.log(JSON.stringify(parse(str)))
