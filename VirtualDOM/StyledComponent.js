
function StyledComponent(config, ...fns) {
    {
        console.log(config, fns);
        let string = "";
        for (let i = 0; i < config.length; i++) {
            string += config[i];
            if (fns[i]) {
                console.log(fns[i]({ background: 'black' }));
                string += fns[i]({ background: 'black' });
            }
        }
        console.log(string);
        {return string;}
    }
}

StyledComponent`
background: ${props => props.background};
border: 1px solid blue;
`
