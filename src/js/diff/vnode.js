/**
 * @param {string} sel
 * @param {{}} data
 * @param {*} children
 * @param {string|number} text
 * @param {HTMLElement} elm
 */
function vnode(sel, data, children, text = undefined, elm = undefined) {
  const { key = undefined } = data;
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
  };
}

export default vnode;
