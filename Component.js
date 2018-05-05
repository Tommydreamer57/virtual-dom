
// function parseEventString(str) {
//     // only works from camelCase
//     return str.split('').map(letter => {
//         if (letter === letter.toLowerCase()) return letter;
//         else return '-' + letter.toLowerCase();
//     }).join('');
// }

class Component {
    static addProps(element, props) {
        for (let prop in props) {
            if (typeof props[prop] === 'function') {
                console.log(prop.toLowerCase())
                console.log(props[prop]);
                element[prop.toLowerCase()] = function (...args) { props[prop](...args) };
                element.setAttribute(prop.toLowerCase(), function (...args) { props[prop](...args) });
                element.addEventListener(prop.toLowerCase(), props[prop]);
            }
            else if (typeof props[prop] === 'object') {
                for (let key in props[prop]) {
                    element[prop][key] = props[prop][key];
                }
            }
            else {
                element.setAttribute(prop, props[prop]);
            }
        }
        return element;
    }
    static createComponent(Comp) {
        if (typeof Comp === 'function') Comp = new Comp();
        return Component.createElement(Comp.render());
    }
    static createElement(element) {
        const { type, props, children } = element;
        const el = Component.addProps(document.createElement(type), props);
        children.forEach(child => {
            if (typeof child === 'string') el.innerHTML += child;
            else if (Array.isArray(child)) {
                child.forEach(child => el.innerHTML += child);
            }
            else if (typeof child === 'function' || child instanceof Component) el.appendChild(Component.createComponent(child));
            else el.appendChild(Component.createElement(child));
        });
        return el;
    }
    constructor(props) {
        this.props = props;
        this.setState = this.setState.bind(this);
    }
    setState(newState) {
        this.state = Object.assign({}, this.state, newState);
    }
}
