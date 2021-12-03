/**
 * @description 创建element节点
 * @param {Object} vnode
 * @return {HTMLElement} dom节点
 */

export default function createElm(vnode) {
  // 创建dom节点
  const domNode = document.createElement(vnode.sel);
  // 如果是文本节点就innerText
  if (vnode.text && (vnode.children === undefined || vnode.children.length === 0)) {
    domNode.innerText = vnode.text;
    // 如果有数组子节点就递归执行
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // h('ul', {}, [
    //   h('li', {}, '牛奶'),
    //   h('li', {}, '咖啡'),
    //   h('li', {}, [
    //     h('ul', {}, [
    //       h('li', {}, '可口可乐'),
    //       h('li', {}, '百事可乐')]),
    //   ]),
    //   h('li', {}, h('p', {}, '雪碧')),
    // ])
    // 每一次child 都会执行h() 返回一个格式化vnode对象
    // {
    //   "sel": "li",
    //   "data": {},
    //   "children": [
    //   {
    //     "sel": "ul",
    //     "data": {},
    //     "children": [
    //       {
    //         "sel": "li",
    //         "data": {},
    //         "text": "可口可乐",
    //         "elm": {}
    //       },
    //       {
    //         "sel": "li",
    //         "data": {},
    //         "text": "百事可乐",
    //         "elm": {}
    //       }
    //     ],
    //     "elm": {}
    //   }
    // ],
    //   "elm": {}
    // }
    vnode.children.forEach((child) => {
      // 当前child 的dom
      const childDom = createElm(child);
      // 把他加入到实例dom的屁股后面
      domNode.appendChild(childDom);
    });
  }
  vnode.elm = domNode;
  // 返回dom节点
  return domNode;
}
