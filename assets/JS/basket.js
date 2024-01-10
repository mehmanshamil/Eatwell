let product = document.getElementById("product")
let inp = document.getElementById("inp")
let srcform = document.getElementById("srcform")
let min = document.getElementById("min")
let max = document.getElementById("max")
let abc = document.getElementById("abc")
let cba = document.getElementById("cba")

min.addEventListener("click", minFunc)
max.addEventListener("click", maxFunc)
abc.addEventListener("click", abcFunc)
cba.addEventListener("click", cbaFunc)
srcform.addEventListener("submit", srcFunc)

function srcFunc(e) {
    e.preventDefault()
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let data = cart.filter((item) => item.title.toLowerCase().includes(inp.value.toLowerCase()))
    display(data)
}
function minFunc() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let data = cart.sort((a, b) => a.price - b.price)
    display(data)
}
function maxFunc() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let data = cart.sort((a, b) => b.price - a.price)
    display(data)
}
function abcFunc() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let data = cart.sort((a, b) => a.title.localeCompare(b.title))
    display(data)
}
function cbaFunc() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let data = cart.sort((a, b) => b.title.localeCompare(a.title))
    display(data)
}


function getData() {
    let data = JSON.parse(localStorage.getItem("cart")) || []
    display(data)
}
getData()


function display(data) {
    product.innerHTML = ""
    data.forEach((item) => {
        let div = document.createElement("div")
        div.className = "box"
        div.innerHTML = `
        <img src="${item.image}" alt="product">
        <p>${item.title}</p>
        <h5>${item.price} $</h5>
        <button onclick="removeTocart(${item.id})"><i class="fa-solid mx-1 fa-trash"></i> Add to cart</button>
        `
        product.appendChild(div)
    })
}
function removeTocart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    getData()
}