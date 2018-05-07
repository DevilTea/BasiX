class PolygonBody {
    constructor(x, y) {
        this.originalPosition = new Vector(x, y)
        this.originalScale = new Vector(1, 1)
        this.originalAngle = 0
        this.originalVertices = []

        this.currentPosition = new Vector(x, y)
        this.currentScale = new Vector(1, 1)
        this.currentAngle = 0
        this.currentVertices = []

        this.previousPosition = new Vector(x, y)
        this.previousScale = new Vector(1, 1)
        this.previousAngle = 0
        this.previousVertices = []
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
            if(this.isMoved()) {
                let deltaX = this.currentPosition.x - this.previousPosition.x
                let deltaY = this.currentPosition.y - this.previousPosition.y
                
                this.previousPosition.x = this.currentPosition.x
                this.previousPosition.y = this.currentPosition.y
                this.currentVertices.forEach((vertex, index) => {
                    vertex.x = vertex.x + deltaX
                    vertex.y = vertex.y + deltaY
                })
                this.previousVertices.forEach((vertex, index) => {
                    vertex.x = this.currentVertices[index].x
                    vertex.y = this.currentVertices[index].y
                })
            }

            if(this.isScaled()) {
                this.previousScale.x = this.currentScale.x
                this.previousScale.y = this.currentScale.y
                this.currentVertices.forEach((vertex, index) => {
                    vertex.x = this.currentPosition.x + (this.originalVertices[index].x - this.currentPosition.x) * this.currentScale.x
                    vertex.y = this.currentPosition.y + (this.originalVertices[index].y - this.currentPosition.y) * this.currentScale.y
                })
                this.previousVertices.forEach((vertex, index) => {
                    vertex.x = this.currentVertices[index].x
                    vertex.y = this.currentVertices[index].y
                })
            }

            if(this.isRotated()) {
                this.currentVertices.forEach((vertex, index) => {
                    let x = (vertex.x - this.currentPosition.x) * Math.cos(this.currentAngle - this.previousAngle) - (vertex.y - this.currentPosition.y) * Math.sin(this.currentAngle - this.previousAngle) + this.currentPosition.x;
                    let y = (vertex.y - this.currentPosition.y) * Math.cos(this.currentAngle - this.previousAngle) + (vertex.x - this.currentPosition.x) * Math.sin(this.currentAngle - this.previousAngle) + this.currentPosition.y;
                    vertex.x = x
                    vertex.y = y
                })
                this.previousAngle = this.currentAngle
                this.previousVertices.forEach((vertex, index) => {
                    vertex.x = this.currentVertices[index].x
                    vertex.y = this.currentVertices[index].y
                })
            }
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