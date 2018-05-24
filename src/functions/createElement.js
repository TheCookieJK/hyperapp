export function createElement(node, isSvg) {
    var element =
        typeof node === "string" || typeof node === "number"
            ? document.createTextNode(node)
            : (isSvg = isSvg || node.nodeName === "svg")
              ? document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  node.nodeName
                )
              : document.createElement(node.nodeName)
    
        var attributes = node.attributes
        if (attributes) {
          if (attributes.oncreate) {
            lifecycle.push(function() {
              attributes.oncreate(element)
            })
          }
    
          for (var i = 0; i < node.children.length; i++) {
            element.appendChild(
              createElement(
                (node.children[i] = resolveNode(node.children[i])),
                isSvg
              )
            )
          }
    
          for (var name in attributes) {
            updateAttribute(element, name, attributes[name], null, isSvg)
          }
        }
    
    return element
}