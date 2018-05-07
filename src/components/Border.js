
class Border extends Component {
    render() {
        return this.toElement('div', { style: { width: '100%', border: '1px solid black' } }, [...this.props.children]);
    }
}
