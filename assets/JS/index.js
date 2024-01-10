let product = document.getElementById("product")
let form = document.getElementById("form")
// form

let namee = document.getElementById("namee")
let email = document.getElementById("email")
let message = document.getElementById("message")
let loadMore = document.getElementById("loadMore")
let page = 1;
let limit = 4;
// basket
loadMore.addEventListener("click", getData)
async function getData() {
    axios.get(`https://6589aaa6324d4171525951a6.mockapi.io/user/product?page=${page}&limit=${limit}`)
        .then((res) => {
            db = res.data
            db.forEach((item) => {
                let div = document.createElement("div")
                div.className = "box"
                div.innerHTML = `
            <img src="${item.image}" alt="product">
            <p>${item.title}</p>
            <h5>${item.price} $</h5>
            <button onclick="addTocart(${item.id})"><i class="fa-solid mx-1 fa-cart-shopping"></i> Add to cart</button>
            `
                product.appendChild(div)
            })
            page++
        })
        .catch((err) => console.log(err))
}

getData()

function addTocart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.push(db.find((item) => item.id == id))
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log(cart);
}

form.addEventListener("submit", formGet)

function formGet(e) {
    e.preventDefault();
    let data = {
        name: namee.value,
        email: email.value,
        message: message.value
    }
    axios.post("https://6589aaa6324d4171525951a6.mockapi.io/user/basket", data)
        .then(() => {
            console.log(data);
            form.reset()
            formDisplay()
        })
}
//form display and detail
let display = document.getElementById("display")
let detail = document.getElementById("detail")

async function formDisplay() {
    detail.innerHTML = ''
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/basket")
        .then((res) => {
            db = res.data
            db.filter((item) => {
                let div = document.createElement("div")
                div.className = "formBox"
                div.innerHTML = `
          <h6>Name:</h6>
          <p>${item.name}</p>
          <h6>Email: </h6>
          <p>${item.email}</p>
          <h6>Message: </h6>
          <p>${item.message}</p>
          <div class="d-flex gap-3">
          <button onclick="chngFunc(${item.id})" id="chng">Change</button>
          <button  onclick="deletegFunc(${item.id})" id="dlt">Delete</button>
      </div>
          `
                detail.appendChild(div)
            })

        })
        .catch((err) => console.log(err))
}
formDisplay()
function deletegFunc(id) {
    axios.delete(`https://6589aaa6324d4171525951a6.mockapi.io/user/basket/${id}`)
        .then(() => formDisplay())
}

async function chngFunc(id) {
    display.style.display = "flex"
    await axios.get(`https://6589aaa6324d4171525951a6.mockapi.io/user/basket/${id}`)
        .then((res) => {
            db = res.data
            display.innerHTML = `
            <div class="detailForm">
                <i id="close" class="fa-regular fa-circle-xmark"></i>
                <input id="newnamee" placeholder="Name" type="text" Value="${db.name}">
                <input id="newemail" placeholder="Email" type="email" Value="${db.email}">
                <textarea id="newmessage" cols="30" placeholder="Write your message" rows="10">${db.message}</textarea>
                <button onclick="saveFunc(${db.id})" id="chng">Save</button>
            </div>
        `
            let close = document.getElementById("close")
            close.addEventListener("click", closeDetail)
        })
        .catch((err) => console.log(err))
}

function saveFunc(id) {

    let newnamee = document.getElementById("newnamee")
    let newemail = document.getElementById("newemail")
    let newmessage = document.getElementById("newmessage")

    let data = {
        name: newnamee.value,
        email: newemail.value,
        message: newmessage.value
    }

    axios.put(`https://6589aaa6324d4171525951a6.mockapi.io/user/basket/${id}`, data)
        .then(() => {
            formDisplay()
            closeDetail()
        })
}
function closeDetail() {
    display.style.display = "none"
}