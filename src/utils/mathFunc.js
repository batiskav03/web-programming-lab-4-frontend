function currentFuncValue(myFunc, value) {
    if (value === undefined)
        return null

    return myFunc(value)
}


/*
    With the parameters (from) & (to) we set the segment, in which the values will be calculated
*/
function arrayValueOnSegment(myFunc, from, to, accuracy = 0.1) {
    if(!(from || to))
        return null
    let arr = [];
    for (let i = from; i < to; i+=accuracy ) {
        arr.push(currentFuncValue(myFunc, i))
    }

    return arr;
}

export {currentFuncValue, arrayValueOnSegment}