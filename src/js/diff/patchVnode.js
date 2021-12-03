import createElm from './createElm';
// eslint-disable-next-line import/no-cycle
import updateChildren from './updateChildren';

/**
 * @description 如果节点相同的操作
 * @param newNode
 * @param oldNode
 */
export default function patchVnode(oldNode, newNode) {
  // 如果节点相同 就停止
  if (oldNode === newNode) return;
  // 先判断新节点有没有text 属性 那么他就没有children h.js 15
  if (newNode.text && (!newNode.children || newNode.children.length === 0)) {
    // 新节点的text 和 老节点的text是不是相同
    if (newNode.text !== oldNode.text) {
      oldNode.elm.innerText = newNode.text;
    }
  } else if (Array.isArray(oldNode.children) && oldNode.children.length > 0) {
    updateChildren(oldNode.elm, oldNode.children, newNode.children);
    //  新老节点都有children 就要进行diff比较
  } else {
    // 老节点没有children 就清空内容 循环填充新节点的children的dom实例
    oldNode.elm.innerText = '';
    newNode.children.forEach((child) => {
      const newDom = createElm(child);
      oldNode.elm.appendChild(newDom);
    });
  }
}
