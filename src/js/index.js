import h from './diff/h';
import patch from './diff/patch';

const app = document.querySelector('#app');

const vn2 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),

]);
const vn3 = h('ul', {}, [
  h('li', { key: 'GG' }, 'GG'),
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'DD' }, 'DDD'),
]);

patch(app, vn2);
setTimeout(() => {
  patch(vn2, vn3);
}, 1000);
