
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
            // ADD EVENT LISTENERS - ADDEVENTLISTENER
            if (typeof props[prop] === 'function') {
                setTimeout(() => {
                    let $mountedElement = document.getElementById($el.id);
                    console.log("$ELEMENT & $MOUNTEDELEMENT");
                    console.log({ $el });
                    console.log({ $mountedElement });
                    let event = prop.toLowerCase().replace(/on/, '');
                    let eventListener = props[prop];
                    $mountedElement.addEventListener(event, eventListener);
                }, 0);
            }
            // ADD STYLE PROPS DIRECTLY TO ELEMENT
            else if (typeof props[prop] === 'object') {
                for (let key in props[prop]) {
                    $el[prop][key] = props[prop][key];
                }
            }
            // ADD NORMAL PROPS - SETATTRIBUTE
            else {
                $el.setAttribute(prop, props[prop]);
            }
        }
        return $el;
    }
    renderComponent(component) {
        if (!component.VD) {
            Object.defineProperty(component, 'VD', {
                get: () => this,
                set: () => { throw new Error('cannot change VD') }
            });
        }
        return component.render();
    }
    createElement(node, originalNode) {
        console.log("CREATE NODE");
        console.log(node);
        // IF NO NODE GIVEN
        if (node === undefined) return undefined;
        // RENDER UNRENDERED COMPONENTS
        if (node instanceof Component) node = this.renderComponent(node);
        // ADD ID FROM ORIGINAL NODE
        if (node && originalNode && originalNode.id) node.id = originalNode.id;
        // CREATE TEXT NODES
        if (typeof node === 'string') return document.createTextNode(node);
        // CREATE NODE & CHILDREN
        else {
            let $el = document.createElement(node.type);
            $el = this.addProps($el, node.props);
            // console.log("NODE CHILDREN");
            // console.log(node.children);
            if (node.children) [...node.children].map(this.createElement).forEach($el.appendChild.bind($el));
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
        console.log("UPDATE ARGUMENTS");
        console.log({$parent});
        console.log({newNode});
        console.log({oldNode});
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
        this.$root = $root;
        $root.appendChild(this.tree);
    }
}
