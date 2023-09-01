let submitBtn = document.getElementById("submit");

const info = {
    sname: '',
    email: '',
    branch: '',
    website: '',
    gender: '',
    skillsArr: [],
}

const getData = () => {

    info.sname = document.getElementById('name').value;
    info.email = document.getElementById('email').value;
    info.branch = document.querySelector('input[name="CSS-IT-EXTC"]:checked').value;
    info.website = document.getElementById('website').value;
    info.gender = document.querySelector('input[name="male-female"]:checked').value;
    let skills = document.querySelectorAll('.checkbox:checked');

    info.skillsArr = [];
    skills.forEach((item) => {
        info.skillArr.push(item.value);
    })
    let infoItem;
    if (localStorage.getItem("infoSection") === null) {
        infoItem = [];
    } else {
        infoItem = JSON.parse(localStorage.getItem("infoSection"))
    }

    infoItem.unshift(info);
    localStorage.setItem("infoSection", JSON.stringify(infoItem));
}

const showData = () => {
    let cardContainer = document.getElementById("cardContainer");

    let cards = '';

    let getLocalStorage = localStorage.getItem("infoSection");

    let cardDivArr;

    if (getLocalStorage === null) {
        console.log("null");
    } else {
        cardDivArr = JSON.parse(getLocalStorage);

        cardDivArr.forEach((item, index) => {

            cards += `<div class="card">
            <img src=${item.url} alt="Profile Picture">
                <div class="info">
                    <p><strong>Name</strong> : ${item.sname}</p>
                    <p><strong>Gender</strong> : ${item.gender}</p>
                    <p><strong>Email</strong> : ${item.email}</p>
                    <p><strong>Website</strong> : <a href="${item.website}">${item.website}</a></p>
                    <p><strong>Skills</strong> : ${item.skillArr.join(", ")}</p>
                    <button onclick="deleteData(${index})">Delete</button>
                </div>
            </div>`;
        })
    }
    cardContainer.innerHTML = cards;
}

const deleteData = (index) => {
    let getList = JSON.parse(localStorage.getItem("infoSection"));
    getList.splice(index, 1);

    localStorage.setItem("infoSection", JSON.stringify(getList));
    window.location.reload();
}

showData();

submitBtn.addEventListener(('click'), (event) => {
    event.preventDefault();
    getData();
    showData();
})

window.onbeforeunload = function() {
    localStorage.clear();
};