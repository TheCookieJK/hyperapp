import { clone } from './clone';
export function updateAttribute(element, name, value, oldValue, isSvg) {
      if (name === "key") {
      } else if (name === "style") {
        for (var i in clone(oldValue, value)) {
          var style = value == null || value[i] == null ? "" : value[i]
          if (i[0] === "-") {
            element[name].setProperty(i, style)
          } else {
            element[name][i] = style
          }
        }
      } else {
        if (name[0] === "o" && name[1] === "n") {
          name = name.slice(2)
  
          if (element.events) {
            if (!oldValue) oldValue = element.events[name]
          } else {
            element.events = {}
          }
  
          element.events[name] = value
  
          if (value) {
            if (!oldValue) {
              element.addEventListener(name, eventListener)
            }
          } else {
            element.removeEventListener(name, eventListener)
          }
        } else if (name in element && name !== "list" && !isSvg) {
          element[name] = value == null ? "" : value
        } else if (value != null && value !== false) {
          element.setAttribute(name, value)
        }
  
        if (value == null || value === false) {
          element.removeAttribute(name)
        }
      }
    }