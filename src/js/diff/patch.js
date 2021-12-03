import vnode from './vnode';
import createElm from './createElm';
import patchVnode from './patchVnode';

/**
 * @description 匹配对比dom
 * @param {Object|HTMLElement} oldNode
 * @param {Object}newNode
 */

export default function patch(oldNode, newNode) {
  // 判断是否是虚拟节点 不是就转换为虚拟dom
  if (oldNode.sel === '' || oldNode.sel === undefined) {
    oldNode = vnode(oldNode.tagName.toLowerCase(), {}, [], undefined, oldNode);
  }
  // 判断是不是同一个节点
  if (oldNode.key === newNode.key && oldNode.sel === newNode.sel) {
    // 对比子节点
    patchVnode(oldNode, newNode);
  } else {
    const el = createElm(newNode);
    oldNode.elm.parentNode.insertBefore(el, oldNode.elm);
  }
}
