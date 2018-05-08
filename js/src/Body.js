class Body {
    constructor(x, y) {
        this.composite = undefined

        this.originalPosition = new Vector(x, y)
        this.originalScale = new Vector(1, 1)
        this.originalAngle = 0
        this.originalVertices = []

        this.predictionPosition = new Vector(x, y)
        this.predictionScale = new Vector(1, 1)
        this.predictionAngle = 0
        this.predictionVertices = []

        this.currentPosition = new Vector(x, y)
        this.currentScale = new Vector(1, 1)
        this.currentAngle = 0
        this.currentVertices = []

        this.previousPosition = new Vector(x, y)
        this.previousScale = new Vector(1, 1)
        this.previousAngle = 0
        this.previousVertices = []

        this.bodyVelocity = new Vector(0, 0)

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

        Object.defineProperty(this, 'vertices', {
            get: () => {
                let vertices = []
                this.currentVertices.forEach((vertex) => {
                    vertices.push(Vector.copy(vertex))
                })
                return vertices
            }
        })

        Object.defineProperty(this, 'velocity', {
            get: () => {
                return Vector.copy(this.bodyVelocity)
            },
            set: (newValue) => {
                Vector.assignBToA(this.bodyVelocity, newValue)
                
            }
        })

        Object.defineProperty(this, 'direction', {
            get: () => {
                return Vector.getUnitVector(this.bodyVelocity)
            }
        })

        Object.defineProperty(this, 'speed', {
            get: () => {
                return Vector.getMagnitude(this.bodyVelocity)
            },
            set: (newValue) => {
                this.velocity = Vector.scale(this.direction, newValue)
            }
        })

        Object.defineProperty(this, 'sides', {
            get: () => {
                let sides = []
                this.vertices.forEach((vertex, index) => {
                    let nextVertex = this.vertices[(index + 1) % this.vertices.length]
                    sides.push(Vector.getVectorAB(vertex, nextVertex))
                });
                return sides
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

    update() {
        if(!Vector.isZeroVector(this.velocity)) {
            Vector.assignBToA(this.currentPosition, Vector.add(this.currentPosition, this.velocity))
        }

        if(this.isChanged()) {
            this.currentVertices.forEach((vertex, index) => {
                vertex.x = this.originalVertices[index].x * this.currentScale.x
                vertex.y = this.originalVertices[index].y * this.currentScale.y
                Vector.assignBToA(vertex, Vector.rotate(vertex, this.currentAngle, Vector.zeroVector()))
            })
            
            Vector.assignBToA(this.previousPosition, this.currentPosition)
            Vector.assignBToA(this.previousScale, this.currentScale)
            this.previousAngle = this.currentAngle
            this.previousVertices.forEach((vertex, index) => {
                Vector.assignBToA(vertex, this.currentVertices[index])
            })
        }
    }

    stroke() {
        let canvas = document.getElementById('canvas')
        let context = canvas.getContext('2d')
        let absolutePosition = Vector.copy(this.currentPosition)
        if(this.composite) {
            let x = this.composite.position.x + (this.currentPosition.x) * this.composite.scale.x
            let y = this.composite.position.y + (this.currentPosition.y) * this.composite.scale.y
            Vector.assignBToA(absolutePosition, Vector.rotate(new Vector(x, y), this.composite.angle, this.composite.position))
            context.beginPath()
            context.moveTo(this.composite.position.x, this.composite.position.y)
            context.lineTo(absolutePosition.x, absolutePosition.y)
        }
        this.currentVertices.forEach((vertex, index) => {
            let nextVertex = this.currentVertices[(index + 1) % this.currentVertices.length]
            context.moveTo(vertex.x + absolutePosition.x, vertex.y + absolutePosition.y)
            context.lineTo(nextVertex.x + absolutePosition.x, nextVertex.y + absolutePosition.y)
            context.strokeStyle = '#eeeeee'
            context.stroke()
        })
        context.closePath()
    }
}