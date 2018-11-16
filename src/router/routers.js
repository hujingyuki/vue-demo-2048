/** @format */

// const HelloWorld = r => require.ensure([], () => r(require('@/components/pages/HelloWorld')), 'helloword')
const index = resolve =>
  require(['@/components/pages/index'], resolve);

export default [
  { path: '/', name: 'index', component: index },
];
