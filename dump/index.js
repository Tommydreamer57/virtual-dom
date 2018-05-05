// import App from './src/App.js';

function insert({ parent, child }) {
    parent.appendChild(child);
}

function insertToDOM({ parent, child }) {
    child = Component.createComponent(child);
    insert({ parent, child });
}

let parent = document.getElementById('root');
let child = new App();

insertToDOM({ parent, child });

/** @jsx jsx */

/*

function jsx(type, props, ...children) {
    return { type, props, children }
}

const root = document.getElementById("root");

console.log({ document });

const el = document.createElement('div');
el.innerHTML = 'HELLO';

console.log(el);

root.appendChild(el);

let elem = <div id="elem" >AGAIN</div>

el.appendChild(elem);

*/

console.log(root);
