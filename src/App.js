
class App extends Component {
    constructor() {
        super();
        this.state = {
            input: 'input'
        }
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput({ target: { value } }) {
        console.log(value);
        this.setState({ input: value });
    }
    render() {
        return {
            type: 'div',
            props: {
                style: { background: '#DEF', padding: '16px' }
            },
            children: [
                Header,
                'TEXT',
                {
                    type: 'p',
                    props: {
                        style: { margin: '8px' }
                    },
                    children: ['INNER TEXT']
                },
                'MORE TEXT',
                ['TEXT', 'IN', 'AN', 'ARRAY'],
                new Input({
                    onKeyPress: this.handleInput,
                    value: this.state.input
                })
            ]
        }
    }
}
