let a = new BasiX.World()
let ac1 = new BasiX.CircleBody(100, 100, 50)
let ac2 = new BasiX.CircleBody(400, 300, 50)

a.addBody(ac1)
a.addBody(ac2)

let k = (e) => {
    a.update(1000/60)
    document.getElementById('canvas').getContext('2d').clearRect(0, 0, 800, 600)
    a.stroke()
}
addEventListener('keydown', k)