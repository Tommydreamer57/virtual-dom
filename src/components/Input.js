
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'input'
        };
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onPaste = this.onPaste.bind(this);
        this.onInput = this.onInput.bind(this);
    }
    onKeyDown({ target: { value }, key }) {
        this.setState({ value });
    }
    onPaste({ target: { value } }) {
        this.setState({ value });
    }
    onInput({ target: { value } }) {
        this.setState({ value });
    }
    render() {
        let { onKeyDown, onPaste, onInput } = this;
        let { value } = this.state;
        return this.toElement('input', { onKeyDown, onPaste, onInput, value }, []);
    }
}
