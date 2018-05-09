BasiX.Composite = class Composite extends BasiX.BasicObject {
    constructor(x, y) {
        super(x, y)
        this.composites = []
        this.bodies = []
    }

    addBody(body) {
        this.bodies.push(body)
        body.parent = this
    }

    addCompostite(composite) {
        this.composites.push(composite)
        composite.parent = this
    }

    update(deltaTime) {
        super.update(deltaTime)
        //if(this.isChanged(true)) {
            this.bodies.forEach((body) => {
                body.currentAngle = this.currentAngle
                BasiX.Vector.assignBToA(body.currentScale, this.currentScale)
                let temp = new BasiX.Vector(body.currentPosition.x * this.currentScale.x, body.currentPosition.y * this.currentScale.y)
                body.currentPosition = BasiX.Vector.rotate(temp, this.currentAngle)

                body.predictAngle = this.predictAngle
                BasiX.Vector.assignBToA(body.predictScale, this.predictScale)
                temp = new BasiX.Vector(body.predictPosition.x * this.predictScale.x, body.predictPosition.y * this.predictScale.y)
                body.predictPosition = BasiX.Vector.rotate(temp, this.predictAngle)
                body.update(deltaTime)
            })
            this.composites.forEach((composite) => {
                composite.update(deltaTime)
            })
            BasiX.Vector.assignBToA(this.previousPosition, this.currentPosition)
            BasiX.Vector.assignBToA(this.previousScale, this.currentScale)
            this.previousAngle = this.currentAngle
        //}
    }

    stroke() {
        this.bodies.forEach((body) => {
            body.stroke()
        })
        this.composites.forEach((composite) => {
            composite.stroke()
        })
    }
}