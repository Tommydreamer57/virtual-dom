
class VirtualDOM {
    constructor(Tree) {
        // BIND METHODS
        this.createElement = this.createElement.bind(this);
        this.getRandomLetter = this.getRandomLetter.bind(this);
        this.getNewKey = this.getNewKey.bind(this);
        this.diff = this.diff.bind(this);
        // KEYS ARRAY FOR STORING KEYS TO EVENT ELEMENTS
        this.keys = new Set();
        // CREATE VIRTUAL DOM TREE
        this.tree = this.createElement(new Tree().render());
    }
    getRandomLetter() {
        return String.fromCharCode(~~(Math.random() * 26 + 65));
    }
    getNewKey() {
        let newKey = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(this.getRandomLetter).join('');
        while (this.keys.has(newKey)) newKey += this.getRandomLetter();
        this.keys.add(newKey);
        return newKey;
    }
    addProps($el, props) {
        if (!$el.key) $el.id = this.getNewKey();
        for (let prop in props) {
            if (typeof props[prop] === 'function') {
                // ADD EVENT LISTENERS SOMEHOW
                // $el[prop] = props[prop];
                setTimeout(() => {
                    let $mountedElement = document.querySelector(`#${$el.id}`);
                    let event = prop.toLowerCase().replace(/on/, '');
                    let eventListener = props[prop];
                    $mountedElement.addEventListener(event, eventListener);
                }, 0);
            }
            else if (typeof props[prop] === 'object') {
                for (let key in props[prop]) {
                    // ADD STYLE PROPS DIRECTLY TO ELEMENT
                    $el[prop][key] = props[prop][key];
                }
            }
            else {
                // USE SETATTRIBUTE FOR NORMAL PROPS
                $el.setAttribute(prop, props[prop]);
            }
        }
        return $el;
    }
    createElement(node) {
        // RENDER UNRENDERED COMPONENTS
        if (node instanceof Component) {
            if (!node.VD) {
                Object.defineProperty(node, 'VD', {
                    get: () => this,
                    set: () => { throw new Error('cannot change VD') }
                });
            }
            node = node.render();
        }
        // CREATE TEXT NODES
        if (typeof node === 'string') return document.createTextNode(node);
        // CREATE NODE & CHILDREN
        else {
            console.log(node);
            let $el = document.createElement(node.type);
            $el = this.addProps($el, node.props);
            node.children.map(this.createElement).forEach($el.appendChild.bind($el));
            return $el;
        }
    }
    diff(node1, node2) {
        // IF NODES ARE DIFFERENT
        return (
            typeof node1 !== typeof node2 ||
            typeof node1 === 'string' && node1 !== node2 ||
            node1.type !== node2.type
        );
    }
    update($parent, newNode, oldNode, index = -1) {
        // IF NO OLD NODE, INSERT NEW NODE
        if (!oldNode && newNode) $parent.appendChild(this.createElement(newNode));
        // IF NO NEW NODE, REMOVE OLD NODE
        else if (!newNode && oldNode) $parent.removeChild($parent.childNodes[index]);
        // IF NODES DIFFERENT, REPLACE OLD NODE
        else if (this.diff(newNode, oldNode)) parent.replaceChild(this.createElement(newNode), $parent.childNodes[index]);
        // COMPARE CHILDREN
        else if (newNode.type) {
            for (let i = 0; i < oldNode.children.length || i < newNode.children.length; i++) {
                this.update($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
            }
        }
    }
    mount($root) {
        $root.appendChild(this.tree);
    }
}
