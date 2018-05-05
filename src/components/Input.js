
class Input extends Component {
    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    onKeyDown({ target: { value }, key }) {
        let input = value + key;
        // console.log(input);
        this.setState({ input });
    }
    render() {
        let { onKeyDown } = this;
        return this.toElement('input', { onKeyDown }, []);
    }
}
