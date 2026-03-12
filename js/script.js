/* ============================= */
/* SLIDER */
/* ============================= */

let slideIndex = 0
const slides = document.querySelectorAll(".slide")

function showSlide(i){

slides.forEach(s => s.classList.remove("active"))

slides[i].classList.add("active")

}

function nextSlide(){

slideIndex++

if(slideIndex >= slides.length){
slideIndex = 0
}

showSlide(slideIndex)

}

function prevSlide(){

slideIndex--

if(slideIndex < 0){
slideIndex = slides.length - 1
}

showSlide(slideIndex)

}

showSlide(slideIndex)

setInterval(nextSlide,5000)


/* ============================= */
/* PARTICULAS */
/* ============================= */

const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")

function resizeCanvas(){

canvas.width = window.innerWidth
canvas.height = window.innerHeight

}

window.addEventListener("resize", resizeCanvas)

resizeCanvas()

let particles = []

for(let i = 0; i < 140; i++){

particles.push({

x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
size: Math.random() * 3 + 1,
speed: Math.random() * 0.8 + 0.2

})

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p => {

p.y -= p.speed

if(p.y < 0){
p.y = canvas.height
}

ctx.shadowBlur = 10
ctx.shadowColor = "#09ff00"

ctx.fillStyle = "#09ff00"

ctx.fillRect(p.x,p.y,p.size,p.size)

})

requestAnimationFrame(animateParticles)

}

animateParticles()


/* ============================= */
/* MENU MOBILE */
/* ============================= */

function toggleMenu(){

document.querySelector(".menu").classList.toggle("active")

}


/* ============================= */
/* CARROSSEL INFINITO */
/* ============================= */

const wrapper = document.getElementById("carouselWrapper")
const carousel = document.getElementById("eventCarousel")

if(wrapper && carousel){

// duplica os cards para criar loop infinito
carousel.innerHTML += carousel.innerHTML

let position = 0
let speed = 0

let isDragging = false
let startX = 0
let startPosition = 0

/* DESKTOP DRAG */

wrapper.addEventListener("mousedown",(e)=>{

isDragging = true
startX = e.clientX
startPosition = position
speed = 0

})

wrapper.addEventListener("mousemove",(e)=>{

if(!isDragging) return

const diff = startX - e.clientX

position = startPosition + diff

})

window.addEventListener("mouseup",()=>{

isDragging = false

})

wrapper.addEventListener("mouseleave",()=>{

isDragging = false

})


/* TOUCH CELULAR */

wrapper.addEventListener("touchstart",(e)=>{

isDragging = true

startX = e.touches[0].clientX

startPosition = position

speed = 0

},{passive:true})

wrapper.addEventListener("touchmove",(e)=>{

if(!isDragging) return

const diff = startX - e.touches[0].clientX

position = startPosition + diff

},{passive:true})

wrapper.addEventListener("touchend",()=>{

isDragging = false

})


/* MOVIMENTO AUTOMÁTICO COM MOUSE */

wrapper.addEventListener("mousemove",(e)=>{

if(isDragging) return

const rect = wrapper.getBoundingClientRect()

const x = e.clientX - rect.left

const center = rect.width / 2

speed = (x - center) * 0.02

})

wrapper.addEventListener("mouseleave",()=>{

speed = 0

})


/* ANIMAÇÃO */

function animateCarousel(){

if(!isDragging){

position += speed

}

const max = carousel.scrollWidth / 2

if(position > max){

position -= max

}

if(position < 0){

position += max

}

carousel.style.transform = `translateX(-${position}px)`

requestAnimationFrame(animateCarousel)

}

animateCarousel()

}


/* ============================= */
/* MODAL */
/* ============================= */

const modal = document.getElementById("eventModal")
const modalImage = document.getElementById("modalImage")
const modalTitle = document.getElementById("modalTitle")
const modalDesc = document.getElementById("modalDesc")
const modalPrice = document.getElementById("modalPrice")
const modalTime = document.getElementById("modalTime")

function openModal(title,image,desc,price,time){

modal.style.display = "flex"

modalTitle.innerText = title
modalImage.src = image
modalDesc.innerText = desc
modalPrice.innerText = price
modalTime.innerText = time

}

function closeModal(){

modal.style.display = "none"

}

modal.addEventListener("click",(e)=>{

if(e.target === modal){

closeModal()

}

})
