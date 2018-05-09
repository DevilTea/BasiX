BasiX.SAT = class SAT {
    //是否分離
    static isSeperate(verticesA, verticesB) {
        let isSeperate = false
        let checkSides = []
        let seperateAxes = []
        checkSides.push(...SAT.getSides(verticesA), ...SAT.getSides(verticesB))
        checkSides.forEach((side) => {
            seperateAxes.push(BasiX.Vector.getNormalL(side))
        })
        seperateAxes.forEach((axis) => {
            if(!isSeperate) {
                let leftmostA = SAT.getLeftmost(verticesA, axis)
                let rightmostA = SAT.getRightmost(verticesA, axis)
                let leftmostB = SAT.getLeftmost(verticesB, axis)
                let rightmostB = SAT.getRightmost(verticesB, axis)
                if(rightmostA < leftmostB || rightmostB < leftmostA) {
                    isSeperate = true
                }
            }
        })
        return isSeperate
    }

    //用頂點得出所有的邊
    static getSides(vertices) {
        let sides = []
        vertices.forEach((vertex, index) => {
            let nextVertex = vertices[(index + 1) % vertices.length]
            sides.push(BasiX.Vector.getVectorAB(vertex, nextVertex))
        });
        return sides
    }

    //將body的頂點投影在axis向量上，並回傳投影後axis上最左邊的點位置
    static getLeftmost(vertices, axis) {
        vertices = [...vertices]
        let leftmost = BasiX.Vector.getProjectionAOnBLength(vertices.shift(), axis)
        vertices.forEach((vertex) => {
            leftmost = Math.min(leftmost, BasiX.Vector.getProjectionAOnBLength(vertex, axis))
        })
        return leftmost
    }

    //將body的頂點投影在axis向量上，並回傳投影後axis上最右邊的點位置
    static getRightmost(vertices, axis) {
        vertices = [...vertices]
        let rightmost = BasiX.Vector.getProjectionAOnBLength(vertices.shift(), axis)
        vertices.forEach((vertex) => {
            rightmost = Math.max(rightmost, BasiX.Vector.getProjectionAOnBLength(vertex, axis))
        })
        return rightmost
    }
}