
/** docoment ready */
export function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

// 备注 页面 & 文档加载周期几种事件的顺序
/* 
readystate: interactive
DOMContentLoaded
readystate: complete
load
 */