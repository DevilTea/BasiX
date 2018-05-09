BasiX.CollisionDetector = class CollisionDetector {
    constructor() {
        this.allBodies = []
        this.pairs = new BasiX.Pairs()
        this.onStartCollisionCallbacks = []
        this.onEndCollisionCallbacks = []
        this.onStartCollisionPairs = []
        this.onEndCollisionPairs = []
    }

    detectAllPairs() {
        this.onStartCollisionPairs.length = 0
        this.onEndCollisionPairs.length = 0
        this.pairs.list.forEach((pair) => {
            let predictVerticesA = pair.bodyA.calculateAbsoluteVertices(false, pair.bodyA.predictVertices)
            let predictVerticesB = pair.bodyB.calculateAbsoluteVertices(false, pair.bodyB.predictVertices)
            let currentVerticesA = pair.bodyA.calculateAbsoluteVertices(true, pair.bodyA.currentVertices)
            let currentVerticesB = pair.bodyB.calculateAbsoluteVertices(true, pair.bodyB.currentVertices)
            if(this.hasCollision(predictVerticesA, predictVerticesB)) {
                this.onStartCollisionPairs.push(pair)
            }
    
            if(this.hasCollision(currentVerticesA, currentVerticesB)) {
                this.onEndCollisionPairs.push(pair)
            }
        })

        let onStartCollisionEvent = new BasiX.Event('onStartCollision', this.onStartCollisionPairs)
        this.onStartCollisionCallbacks.forEach((callback) => {
            callback(onStartCollisionEvent)
        })

        let onEndCollisionEvent = new BasiX.Event('onEndCollision', this.onEndCollisionPairs)
        this.onEndCollisionCallbacks.forEach((callback) => {
            callback(onEndCollisionEvent)
        })

        
        if(this.onStartCollisionPairs.length > 0) {
            console.log(onStartCollisionEvent)
        }
        if(this.onEndCollisionPairs.length > 0) {
            console.log(onEndCollisionEvent)
        }
    }

    hasCollision(verticesA, verticesB) {
        return !BasiX.SAT.isSeperate(verticesA, verticesB)
    }
}