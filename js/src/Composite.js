class Composite {
    constructor(x, y) {
        this.originalPosition = new Vector(x, y)
        this.originalScale = new Vector(1, 1)
        this.originalAngle = 0

        this.predictionPosition = new Vector(x, y)
        this.predictionScale = new Vector(1, 1)
        this.predictionAngle = 0

        this.currentPosition = new Vector(x, y)
        this.currentScale = new Vector(1, 1)
        this.currentAngle = 0

        this.previousPosition = new Vector(x, y)
        this.previousScale = new Vector(1, 1)
        this.previousAngle = 0

        this.compositeVelocity = new Vector(0, 0)
        this.parentComposite = this
        this.composites = []
        this.bodies = []
        this.defineProperties()
    }

    defineProperties() {
        Object.defineProperty(this, 'position', {
            get: () => {
                return Vector.copy(this.currentPosition)
            },
            set: (newValue) => {
                Vector.assignBToA(this.currentPosition, newValue)
            }
        })

        Object.defineProperty(this, 'scale', {
            get: () => {
                return Vector.copy(this.currentScale)
            },
            set: (newValue) => {
                Vector.assignBToA(this.currentScale, newValue)
            }
        })

        Object.defineProperty(this, 'angle', {
            get: () => {
                return this.currentAngle
            },
            set: (newValue) => {
                this.currentAngle = newValue
            }
        })

        Object.defineProperty(this, 'velocity', {
            get: () => {
                return Vector.copy(this.compositeVelocity)
            },
            set: (newValue) => {
                Vector.assignBToA(this.compositeVelocity, newValue)
                
            }
        })

        Object.defineProperty(this, 'direction', {
            get: () => {
                return Vector.getUnitVector(this.compositeVelocity)
            }
        })

        Object.defineProperty(this, 'speed', {
            get: () => {
                return Vector.getMagnitude(this.compositeVelocity)
            },
            set: (newValue) => {
                this.velocity = Vector.scale(this.direction, newValue)
            }
        })
    }

    isMoved() {
        return this.currentPosition.x !== this.previousPosition.x || this.currentPosition.y !== this.previousPosition.y
    }

    isScaled() {
        return this.currentScale.x !== this.previousScale.x || this.currentScale.y !== this.previousScale.y
    }

    isRotated() {
        return this.currentAngle !== this.previousAngle
    }

    isChanged() {
        return this.isMoved() || this.isScaled() || this.isRotated()
    }

    addBody(body) {
        this.bodies.push(body)
        body.composite = this
    }

    addCompostite(composite) {
        this.composites.push(composite)
        composite.parent = this
    }

    update() {
        if(this.isChanged()) {
            this.composites.forEach((composite) => {

                composite.update()
            })
            this.bodies.forEach((body) => {
                body.angle = this.currentAngle
                body.scale = this.currentScale
                body.update()
            })

            Vector.assignBToA(this.previousPosition, this.currentPosition)
            Vector.assignBToA(this.previousScale, this.currentScale)
            this.previousAngle = this.currentAngle
        }
    }

    stroke() {
        this.composites.forEach((composite) => {
            composite.stroke()
        })
        this.bodies.forEach((body) => {
            body.stroke()
        })
    }
}