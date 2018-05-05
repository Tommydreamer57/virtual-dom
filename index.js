
const $root = document.getElementById('root');
const VD = new VirtualDOM(App);

VD.mount($root);

setTimeout(() => console.log($root), 50);

// new VirtualDOM(new App()).mount(document.getElementById('root'));
