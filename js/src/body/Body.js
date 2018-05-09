BasiX.Body = class Body extends BasiX.BasicObject {
    constructor(x, y) {
        super(x, y)
        this.originalVertices = []
        this.predictVertices = []
        this.currentVertices = []
        this.previousVertices = []
    }
    
    calculateAbsoluteVertices(currentOrPredict, vertices) {
        let toReturn = []
        let absolutePosition = currentOrPredict ? this.absolutePosition : BasiX.Vector.add(this.absolutePosition, BasiX.Vector.subtract(this.predictPosition, this.currentPosition))
        vertices.forEach((vertex) => {
            toReturn.push(BasiX.Vector.add(absolutePosition, vertex))
        })
        return toReturn
    }

    update(deltaTime) {
        super.update(deltaTime)
        if(this.isChanged()) {
            this.currentVertices.forEach((vertex, index) => {
                vertex.x = this.originalVertices[index].x * this.currentScale.x
                vertex.y = this.originalVertices[index].y * this.currentScale.y
                BasiX.Vector.assignBToA(vertex, BasiX.Vector.rotate(vertex, this.currentAngle))
            })
            this.predictVertices.forEach((vertex, index) => {
                vertex.x = this.originalVertices[index].x * this.predictScale.x
                vertex.y = this.originalVertices[index].y * this.predictScale.y
                BasiX.Vector.assignBToA(vertex, BasiX.Vector.rotate(vertex, this.predictAngle))
            })
            BasiX.Vector.assignBToA(this.previousPosition, this.currentPosition)
            BasiX.Vector.assignBToA(this.previousScale, this.currentScale)
            this.previousAngle = this.currentAngle
            this.previousVertices.forEach((vertex, index) => {
                BasiX.Vector.assignBToA(vertex, this.currentVertices[index])
            })
        }
    }

    stroke() {
        let canvas = document.getElementById('canvas')
        let ctx = canvas.getContext('2d')
        let absolutePosition = this.absolutePosition
        ctx.beginPath()
        this.currentVertices.forEach((vertex, index) => {
            let next = this.currentVertices[(index + 1) % this.currentVertices.length]
            ctx.moveTo(absolutePosition.x + vertex.x, absolutePosition.y + vertex.y)
            ctx.lineTo(absolutePosition.x + next.x, absolutePosition.y + next.y)
            ctx.strokeStyle = '#eeeeee'
            ctx.stroke()
        })
        ctx.closePath()
    }
}