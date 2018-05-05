
class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let type = 'div';
        let props = {
            id: 'App',
            style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'stretch'
            }
        };
        let children = [
            (new Header({
                style: {
                    borderRadius: '12px',
                    margin: '8px',
                    padding: '16px',
                    width: 'calc(100% - 32px)'
                }
            })),
            (this.toElement('h1', {}, ['APP'])),
            (new Input({}))
        ];
        return {
            type,
            props,
            children
        }
    }
}
