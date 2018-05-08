let a = new Composite(400, 300)
a.addBody(new CircleBody(100, 100, 50))


setInterval(() => {
    a.update()
    document.getElementById('canvas').getContext('2d').clearRect(0, 0, 800, 600)
    a.stroke()
}, 1000 / 60)


let keydown = (e) => {
    if(e.key === 'w') {
        a.angle = a.angle + 10
    }
}
window.addEventListener('keydown', keydown)