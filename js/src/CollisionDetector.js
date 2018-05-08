class CollisionDetector {
    static detectPair(pair) {
        let hasCollision = true
        let bodyA = pair.bodyA
        let bodyB = pair.bodyB
        let checkSides = []
        let seperateAxes = []
        checkSides.push(...bodyA.sides, ...bodyB.sides)
        checkSides.forEach((side) => {
            seperateAxes.push(Vector.getNormalL(side))
        })
        seperateAxes.forEach((axis) => {
            if(hasCollision) {
                let leftmostA = CollisionDetector.getLeftmost(bodyA.vertices, axis)
                let rightmostA = CollisionDetector.getRightmost(bodyA.vertices, axis)
                let leftmostB = CollisionDetector.getLeftmost(bodyB.vertices, axis)
                let rightmostB = CollisionDetector.getRightmost(bodyB.vertices, axis)
                if(rightmostA < leftmostB || rightmostB < leftmostA) {
                    hasCollision = false
                }
            }
        })
        return hasCollision
    }

    static getLeftmost(bodyVertices, axis) {
        let leftmost = Vector.getProjectionAOnBLength(bodyVertices.shift(), axis)
        bodyVertices.forEach((vertex) => {
            leftmost = Math.min(leftmost, Vector.getProjectionAOnBLength(vertex, axis))
        })
        return leftmost
    }

    static getRightmost(bodyVertices, axis) {
        let rightmost = Vector.getProjectionAOnBLength(bodyVertices.shift(), axis)
        bodyVertices.forEach((vertex) => {
            rightmost = Math.max(rightmost, Vector.getProjectionAOnBLength(vertex, axis))
        })
        return rightmost
    }
}