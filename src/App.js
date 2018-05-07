
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#088'
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        let color = this.state.color === '#088' ? '#808' : '#088';
        console.log(color);
        this.setState({ color });
    }
    render() {
        let { onClick } = this;
        let type = 'div';
        let props = {
            id: 'App',
            style: {
                color: this.state.color,
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
            (new Input({})),
            (new Button({ onClick }))
        ];
        return {
            type,
            props,
            // children: [
            //     (new Border({
            children
            //     }))
            // ]
        };
    }
}
