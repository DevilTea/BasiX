BasiX.BasicObject = class BasicObject {
    constructor(x, y) {
        this.parent = this
        this.predictPosition = new BasiX.Vector(x, y)
        this.predictScale = new BasiX.Vector(1, 1)
        this.predictAngle = 0
        this.currentPosition = new BasiX.Vector(x, y)
        this.currentScale = new BasiX.Vector(1, 1)
        this.currentAngle = 0
        this.previousPosition = new BasiX.Vector(x, y)
        this.previousScale = new BasiX.Vector(1, 1)
        this.previousAngle = 0
        this.objectVelocity = new BasiX.Vector(0, 0)

        Object.defineProperty(this, 'absolutePosition', {
            get: () => {
                if(this.parent === this) {
                    return BasiX.Vector.copy(this.currentPosition)
                } else {
                    return BasiX.Vector.add(this.parent.absolutePosition, this.currentPosition)
                }
            }
        })

        Object.defineProperty(this, 'relativePosition', {
            get: () => {
                return BasiX.Vector.copy(this.currentPosition)
            },
            set: (newValue) => {
                BasiX.Vector.assignBToA(this.currentPosition, newValue)
            }
        })

        Object.defineProperty(this, 'scale', {
            get: () => {
                return BasiX.Vector.copy(this.currentScale)
            },
            set: (newValue) => {
                BasiX.Vector.assignBToA(this.currentScale, newValue)
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
                return BasiX.Vector.copy(this.objectVelocity)
            },
            set: (newValue) => {
                BasiX.Vector.assignBToA(this.objectVelocity, newValue)
            }
        })

        Object.defineProperty(this, 'direction', {
            get: () => {
                return BasiX.Vector.getUnitVector(this.objectVelocity)
            }
        })

        Object.defineProperty(this, 'speed', {
            get: () => {
                return BasiX.Vector.getMagnitude(this.objectVelocity)
            },
            set: (newValue) => {
                this.velocity = BasiX.Vector.scale(this.direction, newValue)
            }
        })
    }

    isMoved() {
        return !BasiX.Vector.isEqual(this.currentPosition, this.previousPosition)
    }

    isScaled() {
        return !BasiX.Vector.isEqual(this.currentScale, this.previousScale)
    }

    isRotated() {
        return this.currentAngle !== this.previousAngle
    }

    isChanged() {
        return this.isMoved() || this.isScaled() || this.isRotated()
    }

    update(deltaTime) {
        if(!BasiX.Vector.isZeroVector(this.objectVelocity)) {
            let deltaVelocity = BasiX.Vector.scale(this.objectVelocity, deltaTime / 1000)
            BasiX.Vector.assignBToA(this.currentPosition, BasiX.Vector.add(this.currentPosition, deltaVelocity))
            BasiX.Vector.assignBToA(this.predictPosition, BasiX.Vector.add(this.currentPosition, deltaVelocity))
        }
    }
}