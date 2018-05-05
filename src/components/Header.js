
class Header extends Component {
    render() {
        return this.toElement('header',
            {
                ...this.props,
                style: {
                    ...this.props.style,
                    background: '#DEF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }, [
                'HEADER',
                'HEADER',
                'HEADER',
                this.toElement('p', {}, [
                    'PARAGRAPH',
                    'PARAGRAPH'
                ]),
                this.toElement('p', {}, [
                    'PARAGRAPH',
                    'PARAGRAPH'
                ]),
            ]);
    }
}
