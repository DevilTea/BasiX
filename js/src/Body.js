class Body {
    constructor(x, y) {
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

        this.velocity = new Vector(0, 0)

        Object.defineProperty(this, 'position', {
            get: () => {
                return Vector.copy(this.currentPosition)
            },
            set: (newValue) => {
                Vector.assignBToA(this.previousPosition, this.currentPosition)
                Vector.assignBToA(this.currentPosition, newValue)
            }
        })

        Object.defineProperty(this, 'scale', {
            get: () => {
                return Vector.copy(this.currentScale)
            },
            set: (newValue) => {
                Vector.assignBToA(this.previousScale, this.currentScale)
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
        if(this.isChanged()) {
            this.currentVertices.forEach((vertex, index) => {
                vertex.x = this.currentPosition.x + (this.originalVertices[index].x - this.originalPosition.x) * this.currentScale.x
                vertex.y = this.currentPosition.y + (this.originalVertices[index].y - this.originalPosition.y) * this.currentScale.y
                let x = (vertex.x - this.currentPosition.x) * Math.cos(this.currentAngle) - (vertex.y - this.currentPosition.y) * Math.sin(this.currentAngle) + this.currentPosition.x;
                let y = (vertex.y - this.currentPosition.y) * Math.cos(this.currentAngle) + (vertex.x - this.currentPosition.x) * Math.sin(this.currentAngle) + this.currentPosition.y;
                vertex.x = x
                vertex.y = y
            })
            
            this.previousPosition.x = this.currentPosition.x
            this.previousPosition.y = this.currentPosition.y
            this.previousScale.x = this.currentScale.x
            this.previousScale.y = this.currentScale.y
            this.previousAngle = this.currentAngle
            this.previousVertices.forEach((vertex, index) => {
                vertex.x = this.currentVertices[index].x
                vertex.y = this.currentVertices[index].y
            })
        }
    }

    stroke() {
        this.update()
        let canvas = document.getElementById('canvas')
        let context = canvas.getContext('2d')
        this.currentVertices.forEach((vertex, index) => {
            let nextVertex = this.currentVertices[(index + 1) % this.currentVertices.length]
            context.moveTo(vertex.x, vertex.y)
            context.lineTo(nextVertex.x, nextVertex.y)
            context.strokeStyle = '#eeeeee'
            context.stroke()
        })
    }
}