
class Button extends Component {
    render() {
        let { onClick } = this.props;
        return this.toElement('button', { onClick }, ['CHANGE COLOR']);
    }
}
