


const print = (pol, pretext) => {
    console.log(`:${pretext} -> :${pol}`)
    // if (pretext) {
    //     process.stdout.write(`\n${pretext} `)
    // }
    // for (const p of pol) {
    //     process.stdout.write(`[${p[0]},${p[1]}]`)
    // }
    // process.stdout.write("\n")
}

const translate = (x, y, p) => {
    let xi = 0 - x;
    let yi = 0 - y;

    // if (x < 0) xi = -xi
    // if (y < 0) yi = -yi

    for (let i = 0; i < p.length; i++) {
        p[i] = [p[i][0] + xi, p[i][1] + yi]
    }
    // console.log(`p now is -> : ${p}`)
}

// const lengthLine = (start, end) => {
//     return Math.sqrt(Math.pow((end[0] - start[0]), 2) + Math.pow((end[1] - start[1]), 2))
// }

//tanQ =  y2-y1/x2-x1
//Q  = tan-(y2-y1/x2-x1)
const findAngleInRadian = (endPoint) => {
    const [x, y] = endPoint

    //tanΘ = (y - 0)/(x - 0)
    //tanΘ = y/x
    //Θ = atan(y/x)
    const radians = Math.atan(y / x);
    const angle = radians * (180 / Math.PI);
    console.log(`original radian is : ${radians}`)
    console.log(`original angle is : ${angle}`)
    const quadrant = findQuadrant(endPoint);
    console.log(`quadrant is : ${quadrant}`)
    let adjustedAngle = 0;
    switch (quadrant) {
        case 4: adjustedAngle = -angle; break;
        case 3: adjustedAngle = 180 - angle; break;
        case 2: adjustedAngle = 180 - angle; break;
        case 1: adjustedAngle = 360 - angle; break;
        default: throw new Error(`Unknown value for quadrant : ${quadrant}`)
    }
    console.log(`adjusted angle : ${adjustedAngle}`)
    return (adjustedAngle * Math.PI) / 180
}

const findQuadrant = ([x, y]) => {
    if (x > 0 && y > 0) return 1
    if (x < 0 && y > 0) return 2
    if (x < 0 && y < 0) return 3
    if (x > 0 && y < 0) return 4
    else throw new Error(`Unknow quadrant `)
}

const applyRotation = (poly, radian) => {
    //x' = xcosΘ - ysinΘ
    //y' = xconsΘ + ysinΘ
    return poly.map(([x, y]) => ([
        ((x * Math.cos(radian)) - (y * Math.sin(radian))),
        ((x * Math.sin(radian)) + (y * Math.cos(radian)))]
    ))
}

export const run = (poly) => {
    print(poly, "Original values are : ")

    // first translated
    // then find the E value
    // find the angle from E

    translate(poly[0][0], poly[0][1], poly);
    print(poly, "After translate values are : ")

    const last = poly[poly.length - 1];
    const angle = findAngleInRadian(last);
    console.log(`angle in radian : ${angle}`)

    const newPoly = applyRotation(poly, angle)

    print(newPoly, "After rotaion values are : ")
    // render(poly)
    return newPoly
}



// console.log(findAngleInRadian([1, -2]))
// console.log(findAngleInRadian([-1,-2]))
// console.log(findAngleInRadian([-1,-2]))
// console.log(findAngleInRadian([-1,-2]))

// run([[6, 18], [14, 18], [16, 9], [10, 5], [4, 9]])
// run([[15,-13],[4,6],[11,3],[-19,7],[0,5]])
//  run([[-19,9],[14,5],[-4,-7],[14,0],[4,8]])
// run([[13,1],[15,8],[-17,7],[-2,8],[-17,-4]])
// run([[15,-2],[16,-13],[2,11],[13,-6],[18,-11]])
// run ([[-13,-20],[-18,0],[-11,7],[-5,0],[10,-12]])




