
class Component {
    constructor({ ...props } = {}) {
        // PROPS
        this.props = props;
        // RENDER TRACK
        this.previousRender;
        this.currentRender;
        // LIVECYCLE METHODS
        this.render = this.render.bind(this);
        this.setState = this.setState.bind(this);
        this.trackRender = this.trackRender.bind(this);
        this.toElement = this.toElement.bind(this);
    }
    setState(newState) {
        if (typeof newState === 'function') newState = newState(this.state);
        this.state = deepAssign({}, this.state, newState);
        let newRender = this.trackRender();
        // console.log(this.state);
        // console.log(newRender);
        this.VD.update(this.VD.$root, this.VD.createElement(newRender), this.VD.createElement(this.previousRender));
    }
    trackRender() {
        this.previousRender = this.currentRender;
        this.currentRender = this.render();
        return this.currentRender;
    }
    toElement(type, props, ...children) {
        if (children.length === 1 && Array.isArray(children[0])) children = children[0];
        return {
            type,
            props,
            children
        }
    }
}
