BasiX.World = class World extends BasiX.Composite {
    constructor() {
        super(0, 0)
        this.collisionDetector = new BasiX.CollisionDetector()
    }

    addBody(newBody) {
        super.addBody(newBody)
        this.collisionDetector.allBodies.forEach((body) => {
            this.collisionDetector.pairs.addPair(new BasiX.Pair(newBody, body))
        })
        this.collisionDetector.allBodies.push(newBody)
    }

    addComposite(newComposite) {
        super.addComposite(newComposite)
        let func = (composite) => {
            composite.bodies.forEach((body => {
                this.addBody(body)
            }))
            composite.composites.forEach((childComposite) => {
                func(childComposite)
            })
        }
        func(newComposite)
    }

    update(deltaTime) {
        super.update(deltaTime)
        this.collisionDetector.detectAllPairs()
    }
}