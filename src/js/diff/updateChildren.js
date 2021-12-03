import patchVnode from './patchVnode';
import createElm from './createElm';

const checkSameVnode = (a, b) => a.sel === b.sel && a.key === b.key;

export default function updateChildren(preNode, oldChildren, newChildren) {
  // 抽象下标 旧前,旧后,新前,新后
  let oldStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newStartIdx = 0;
  let newEndIdx = newChildren.length - 1;

  // 节点实例 旧前,旧后,新前,新后
  let oldStartVnode = oldChildren[0];
  let oldEndVnode = oldChildren[oldEndIdx];
  let newStartVnode = newChildren[0];
  let newEndVnode = newChildren[newEndIdx];
  let keymap = null;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode === undefined) {
      oldStartVnode = oldChildren[++oldStartIdx];
    }
    if (oldEndVnode === undefined) {
      oldEndVnode = oldChildren[--oldEndIdx];
    }

    // 第一步 旧前 新前匹配
    if (checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log(1);
      // 如果两个节点相同 就说明是同一个节点  就直接patchVnode
      patchVnode(oldStartVnode, newStartVnode);
      // 然后把抽象下标调整进行下一级循环,同时 循环队列里面两个已经匹配的节点就除去队列
      // 新前 旧前下标就+1  数组从左数长度加1
      oldStartVnode = oldChildren[++oldStartIdx];
      newStartVnode = newChildren[++newStartIdx];
      // 第二步 新后 旧后匹配
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      console.log(2);
      // 如果两个节点相同 就说明是同一个节点  就直接patchVnode
      patchVnode(oldEndVnode, newEndVnode);
      // 新后 旧后下标-1 数组从右数长度减1
      oldEndVnode = oldChildren[--oldEndIdx];
      newEndVnode = newChildren[--newEndIdx];
      // 第三步 新后 旧前匹配
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      console.log(3);
      // 如果两个节点相同 就说明是同一个节点  就直接patchVnode
      patchVnode(oldStartVnode, newEndVnode);
      // 新后与旧前    插入旧后之后 同时节点还需要移动
      // 父节点.insertBefore(旧前,旧后的下一个节点)
      preNode.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);

      // 新的 右边数组-1 旧的 左边数组+1
      oldStartVnode = oldChildren[++oldStartIdx];
      newEndVnode = newChildren[--newEndIdx];
    } else if (checkSameVnode(newStartVnode, oldEndVnode)) {
      console.log(4);
      // 如果两个节点相同 就说明是同一个节点  就直接patchVnode
      patchVnode(newStartVnode, oldEndVnode);
      // 新后与旧前   插入旧后之后 同时节点还需要移动
      // 父节点.insertBefore(新前,旧前)
      preNode.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      // 新的 左边数组+1 旧的 右边数组-1
      oldEndVnode = oldChildren[--oldEndIdx];
      newStartVnode = newChildren[++newStartIdx];
    } else if (!keymap) {
      // 都没触发判断就循环旧节点children
      // 初始化keymap
      keymap = {};
      // 把key循环添加到keymap里面
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        const { key } = oldChildren[i];
        if (key !== undefined) {
          keymap[key] = i;
        }
      }
      // 当前 判断的这一项在旧节点里面是什么
      const indexInOldChildren = keymap[newStartVnode.key];
      if (indexInOldChildren === undefined) {
        // 新的没有在旧的没找到就是全新的一项
        // 插入在旧前之前 同时需要创建dom
        preNode.insertBefore(createElm(newStartVnode), oldStartVnode.elm);
      } else {
        // 不是新的 就是老的 但是需要移动位置
        const elmToMove = oldChildren[indexInOldChildren];
        // 对比一下是不是相同的
        patchVnode(elmToMove, newStartVnode);
        // 把老的标记为undefined已处理
        oldChildren[indexInOldChildren] = undefined;
        // 插入旧前之前
        preNode.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      // 新的等于下一个新前
      newStartVnode = newChildren[++newStartIdx];
    }
  }

  // 如果循环结束 新前小于新后 说明还有没有添加的
  if (newStartIdx <= newEndIdx) {
    // 循环添加新前和新后中的节点
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // 在旧前之前 添加
      preNode.insertBefore(createElm(newChildren[i]), oldChildren[oldStartIdx] ? oldChildren[oldStartIdx].elm : null);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // 如果循环结束新前小于新后 说明需要删除节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      // 如果有这项
      if (oldChildren[i]) {
        preNode.removeChild(oldChildren[i].elm);
      }
    }
  }
}

export {
  checkSameVnode,
};
