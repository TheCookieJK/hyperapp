import { clone } from './functions/clone';
import { patch } from './functions/patch';
import { recycleElement } from './functions/recycleElement';
import { wireStateToActions } from './functions/wireStateToActions';

export function app(state, actions, view, container) {
    var rootElement = (container && container.children[0]) || null
    var oldNode = rootElement && recycleElement(rootElement)
    var lifecycle = []
    var skipRender
    var isRecycling = true
    var globalState = clone(state)
    var wiredActions = wireStateToActions([], globalState, clone(actions))
  
    scheduleRender()
  
    return wiredActions
  
    
  
    function resolveNode(node) {
      return typeof node === "function"
        ? resolveNode(node(globalState, wiredActions))
        : node != null
          ? node
          : ""
    }
  
    function render() {
        skipRender = !skipRender
    
        var node = resolveNode(view)
    
        if (container && !skipRender) {
            rootElement = patch(container, rootElement, oldNode, (oldNode = node))
        }
    
        isRecycling = false
    
        while (lifecycle.length) lifecycle.pop()()
    }
  
    function scheduleRender() {
      if (!skipRender) {
        skipRender = true
        setTimeout(render)
      }
    }

  
    function setPartialState(path, value, source) {
      var target = {}
      if (path.length) {
        target[path[0]] =
          path.length > 1
            ? setPartialState(path.slice(1), value, source[path[0]])
            : value
        return clone(source, target)
      }
      return value
    }
  
    function getPartialState(path, source) {
      var i = 0
      while (i < path.length) {
        source = source[path[i++]]
      }
      return source
    }
  
    
}
  