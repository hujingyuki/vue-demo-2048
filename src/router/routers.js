/** @format */

// const HelloWorld = r => require.ensure([], () => r(require('@/components/pages/HelloWorld')), 'helloword')
const HelloWorld = resolve =>
  require(['@/components/pages/HelloWorld'], resolve);

export default [
  { path: '/', name: 'HelloWorld', component: HelloWorld },
];
