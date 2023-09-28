function getStatus(key, value) {
    let asnwers = ['off', 'on']

    if(key === 'Front door' || key === 'Back door') {
        asnwers = ['closed', 'opened']
    }

    return asnwers[+value]
}

export function randomChange(object) {
    const keys = Object.keys(object);
    const item = keys[Math.floor(Math.random()*keys.length)];

    object[item] = !object[item]

    return `${item} ${getStatus(item, object[item])}`
}