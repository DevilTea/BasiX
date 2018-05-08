class World extends Composite {
    constructor() {
        super(0, 0)
        this.allBodies = []
        this.pairs = new Pairs()
    }

    addBody(newBody) {
        super.addBody(newBody)
        this.allBodies.forEach((body) => {
            pairs.addPair(new Pair(newBody, body))
        })
        this.allBodies.push(newBody)
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
}