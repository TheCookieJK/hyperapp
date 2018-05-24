import { removeChild } from './removeChild';
export function removeElement(parent, element, node) {
    function done() {
      parent.removeChild(removeChildren(element, node))
    }
    var cb = node.attributes && node.attributes.onremove
    if (cb) {
        cb(element, done)
    } else {
        done()
    }
}