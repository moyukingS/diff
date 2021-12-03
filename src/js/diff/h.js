import vnode from './vnode';

/**
 *
 * @param sel
 * @param data
 * @param c
 */
export default function h(sel, data, c) {
  if (arguments.length !== 3) {
    throw new Error('参数个数出错');
  }
  // 如果c是文字节点 直接返回
  if (typeof c === 'string' || typeof c === 'number') {
    return vnode(sel, data, undefined, c);
  }
  // 如果c是 h()[]
  if (Array.isArray(c)) {
    const children = c.map((child) => {
      if (!(typeof child === 'object' || typeof Object.hasOwnProperty.call(child, 'sel'))) {
        throw new Error('错误');
      }
      return child;
    });
    return vnode(sel, data, children);
  }
  // 如果c是h()并且有sel
  if (typeof c === 'object' || typeof Object.hasOwnProperty.call(c, 'sel')) {
    return vnode(sel, data, [c]);
  }
  throw new Error('错误');
}
