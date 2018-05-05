
function deepCopy(obj, prev = []) {
    let newObj = {};
    if (Array.isArray(obj)) obj = [];
    for (let prop in obj) {
        let value = obj[prop];
        if (typeof value === 'object') {
            let circular = prev.find(p => p.old === value);
            if (circular) {
                newObj[prop] = circular.new;
            } else {
                newObj[prop] = deepCopy(obj[prop]);
                prev.push({
                    prop,
                    old: value,
                    new: newObj[prop]
                });
            }
        } else newObj[prop] = value;
    }
    return newObj;
}

function deepAssign(all, prev = []) {
    if (arguments.length > 2) {
        all = [...arguments];
        prev = Array.isArray(all[all.length - 1]) ? all.pop() : [];
    }
    let obj = all.shift();
    while (all.length) {
        let assign = all.shift();
        for (let prop in assign) {
            let value = assign[prop];
            if (typeof value === 'object') {
                let circular = prev.some(p => p.old === value);
                if (circular) {
                    obj[prop] = circular.new;
                } else {
                    prev.push({
                        prop,
                        old: value,
                        new: obj[prop] = deepAssign(Array.isArray(value) ? [] : {}, value, prev)
                    });
                }
            }
            else obj[prop] = value;
        }
    }
    return obj;
}
