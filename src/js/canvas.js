import platform from '../img/iceplatform.png'
import whiteforest from '../img/whiteforestbig.png'
import heroright from '../img/actionguyrightcc.png'
import heroleft from '../img/actionguyleft_nobg.png'
//import redhood from '../img/redhoodrightnobg.png'
//import alignguy from '../img/alignmentguy.png'
import alignguy from '../img/actionguyrightcc.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//full size
//canvas.width = innerWidth
//canvas.height = innerHeight

canvas.width = 1200
canvas.height = 675

const gravity = 0.8

class Player {
    constructor() {
        this.speed = 6
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 1
        }

        // this.width = 69
        // this.height = 195
        this.width = 108
        this.height = 195

        this.image = createImage(heroleft)
        this.frames = 0
        this.maxMovementFrames = 5
        this.fakeFrames = 0
        this.sprites = {
            stand:{
                spriteImage: createImage(alignguy),
                startingPoint: 187,
                spriteSpacing: 142,
                startingPointY: 35,
                widthOfCrop: 65,
                cropHeight: 108,
                spriteCount: 5
            },
            standleft:{
                spriteImage: createImage(heroleft),
                startingPoint: 20,
                spriteSpacing: 142,
                startingPointY: 35,
                widthOfCrop: 65,
                cropHeight: 108,
                spriteCount: 5
            },
            run:{
                spriteImage: createImage(alignguy),
                startingPoint: 157,
                spriteSpacing: 142,
                startingPointY: 330,
                widthOfCrop: 115,
                cropHeight: 98,
                spriteCount: 6
            },
            jump:{
                spriteImage: createImage(alignguy),
                startingPoint: 187,
                spriteSpacing: 142,
                startingPointY: 35,
                widthOfCrop: 65,
                cropHeight: 108,
                spriteCount: 4
            },
            moveleft:{
                spriteImage: createImage(heroleft),
                startingPoint: 0,
                spriteSpacing: 142,
                startingPointY: 330,
                widthOfCrop: 115,
                cropHeight: 98,
                spriteCount: 5
            }
        }

        this.currentSprite = this.sprites.stand

    }

    
    draw(){

        c.drawImage(
            this.currentSprite.spriteImage, 
            this.currentSprite.startingPoint + this.currentSprite.spriteSpacing*this.frames,
            this.currentSprite.startingPointY,
            this.currentSprite.widthOfCrop,
            this.currentSprite.cropHeight,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height)

            // this.image, 
            // (142*(this.frames)), //where crop starts 
            // 330,
            // 115, //width of crop
            // 98, //crop height
            // this.position.x, 
            // this.position.y, 
            // this.width, 
            // this.height)
    }

    update() {
        this.draw()

        if(this.fakeFrames>20){//11
            this.frames ++
            this.fakeFrames = 0
            console.log("frame : " + this.frames)
        }
        this.fakeFrames ++
        //console.log("fakeframe " + this.fakeFrames)
        if(this.frames >= this.maxMovementFrames) this.frames = 0

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
        
    }
}

class Platform {
    constructor({x,y, image}) {
        this.position = {
            x: x,
            y: y,
            image: ''
        }

        this.image = image
        this.width = this.image.width
        this.height = this.image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
        //c.fillStyle = 'green'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class GenericObject {
  constructor({x,y, image}) {
      this.position = {
          x: x,
          y: y,
          image: ''
      }

      this.image = image
      this.width = this.image.width
      this.height = this.image.height
  }

  draw() {
      c.drawImage(this.image, this.position.x, this.position.y)
      //c.fillStyle = 'green'
      //c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

function createImage(imageSrc) {
  const image = new Image()
  image.src = imageSrc
  return image
}

const platformImage = createImage(platform)

const player = new Player()
const platforms = [new Platform({x:0, y:canvas.height - platformImage.height, image: platformImage}),
                    new Platform({x: 350, y:canvas.height - 250, image: platformImage}),
                    new Platform({x: 1000, y:canvas.height - 450, image: platformImage}),
                    new Platform({x: 1550, y:canvas.height - 250, image: platformImage}),
                    new Platform({x: 2000, y:canvas.height - 450, image: platformImage}),
                    new Platform({x: 2250, y:canvas.height - 250, image: platformImage}),
                    new Platform({x: 2480, y:canvas.height - 450, image: platformImage}),
                    new Platform({x: 3000+platformImage.width, y:canvas.height - 100, image: platformImage}),
                    new Platform({x: 3000+platformImage.width*2, y:canvas.height - 100, image: platformImage}),
                    new Platform({x: 3000+platformImage.width*3, y:canvas.height - 100, image: platformImage}),
                    new Platform({x: 3450+platformImage.width*3, y:canvas.height - 450, image: platformImage}),
                ]

const backgroundImage = createImage(whiteforest)

const genericObjects = [ 
  new GenericObject ({
    x:0, y:0, image: backgroundImage
  }),
  new GenericObject ({
    x:backgroundImage.width -2, y: 0, image: backgroundImage
  }),
  new GenericObject ({
    x:backgroundImage.width*2 -2, y: 0, image: backgroundImage
  })
]


const keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    },
    jump:{
        pressed:false
    }
}

let myGamepad
var counter
let scrollOffset = 0

//MAIN ANIMATION LOOP
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'White'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach(genericObject => {
      genericObject.draw()
    })
    
    platforms.forEach(platform => {
        platform.draw()
    })
    
    player.update()
    
    //myGamepad = navigator.getGamepads()[0]; // use the first gamepad (xbox-only)
    
    //keyboard nav
    if (keys.right.pressed && player.position.x < 500) {
        console.log('move right')
        player.velocity.x = player.speed
    } else if(keys.left.pressed && player.position.x > 100  || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
        console.log("move left")
        //&& player.position.x > 100  || keys.left.pressed && scrollOffset === 0 && player.position.x > 0 
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if(keys.right.pressed){

            scrollOffset += player.speed
            
            platforms.forEach(platform => {
                platform.position.x -= player.speed
                scrollOffset += player.speed
            })
            genericObjects.forEach(genericObject => {
              genericObject.position.x -= player.speed * .66
              scrollOffset += player.speed * .66
          })
        }else if (keys.left.pressed && scrollOffset > 0){

            scrollOffset -=player.speed
            
            platforms.forEach(platform => {
                platform.position.x += player.speed
                scrollOffset -= player.speed
            })
            genericObjects.forEach(genericObject => {
              genericObject.position.x += player.speed * .66
              scrollOffset -= player.speed * .66
          })
        }

    }

    // way of winning
    // if(scrollOffset > 3000){
    //     player.velocity.x = 0
    //     console.log("you win")
    // }

    

    //Game pad code
    // if (  && player.position.x < 500) {
    //     console.log('move right')
    //     player.velocity.x = 5
    // } else if(myGamepad.axes[0] <= -.8 && player.position.x > 100) {
    //     player.velocity.x = -5
    // } else {
    //     player.velocity.x = 0

                // if(myGamepad.axes[0] > .8){
                        
                //     platforms.forEach(platform => {
                //         platform.position.x -= 5
                //     })
                // }else if (myGamepad.axes[0] <= -.8){
                    
                //     platforms.forEach(platform => {
                //         platform.position.x += 5
                //     })
                // }
    // }

    //gamepad jump function
    // if (myGamepad.buttons[0].pressed){
    //     console.log("jump")
    //     console.log(myGamepad.buttons[0].pressed)
    //         player.velocity.y = -15
    // }else{
    //     console.log("do you get here")
    //     myGamepad.buttons[0].pressed = false
    // }

    //tracking collion on platform
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
            //console.log('checking platform detectiondd')
            player.velocity.y = 0
        }
    })

    //console.log("animation loop running")
}

animate()

addEventListener('keydown', ({keyCode}) => {
    //console.log(keyCode)
    switch (keyCode) {
        case 65:
            console.log(" pressing left button")
            keys.left.pressed = true
            player.currentSprite = player.sprites.moveleft
            break
        case 83:
            console.log("down")
            player.velocity.y = 0
            break
        case 68:
            console.log("right")
            keys.right.pressed = true
            player.currentSprite = player.sprites.run
            break
        case 87:
            console.log("up")
            player.velocity.y -= 25
            break
    }
})

addEventListener('keyup', ({keyCode}) => {
    //console.log(keyCode)
    switch (keyCode) {
        case 65:
            console.log("left")
            keys.left.pressed = false
            player.currentSprite = player.sprites.standleft
            break
        case 83:
            console.log("down")
            player.velocity.y = 0
            break
        case 68:
            console.log("right")
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand
            break
        case 87:
            console.log("up")
            player.velocity.y = 0
            break
    }
})

