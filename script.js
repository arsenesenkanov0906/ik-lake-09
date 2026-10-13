
// =========================
// ДАННЫЕ КАТЕГОРИЙ
// =========================
const data = {

    yurts: [
        {
            name:"VIP Юрта",
            price:500,
            people:8,
            image:"/standart-yurta.jpg"
        },
        {
            name:"Семейная Юрта",
            price:2000,
            people:6,
            image:"/standart-yurta.jpg"
        },
        {
            name:"Стандарт Юрта",
            price:1000,
            people:4,
            image:"/standart-yurta.jpg"
        }
        
    ],

    umbrellas:[
        {
            name:"Сап",
            price:500,
            people:2,
            image:"/sap.jpg"
        },
        {
            name:"VIP Сап",
            price:800,
            people:4,
            image:"/sap.jpg"
        }
    ],

    tapchans:[
        {
            name:"Тапчан",
            price:450,
            people:6,
            image:"/tap.jpg"
        },
        {
            name:"VIP Тапчан",
            price:500,
            people:8,
            image:"tap.jpg"
        }
    ]

};


// =========================
// ВЫБРАННАЯ ОСНОВНАЯ УСЛУГА
// =========================
let selectedService = "";


// =========================
// ПОКАЗ КАТЕГОРИИ
// =========================
function showCategory(type){

    const items = document.getElementById("items");

    document.querySelector(".categories").style.display = "none";

    items.innerHTML = "";

    data[type].forEach(item => {

        items.innerHTML += `
        <div class="card" onclick="openService('${item.name}')">

            <img src="${item.image}" alt="${item.name}" class="card-image">

            <h3>${item.name}</h3>

            <p>👥 ${item.people} человек</p>

            <p>💰 ${item.price} сом</p>

        </div>
        `;

    });

    // Кнопка "Назад"
    items.innerHTML += `
        <div style="width:100%; text-align:center; margin-top:20px;">
            <button onclick="goBack()">⬅ Назад</button>
        </div>
    `;

}

function goBack(){

    document.querySelector(".categories").style.display = "flex";

    document.getElementById("items").innerHTML = "";

}


// =========================
// ВЫБОР ОСНОВНОЙ УСЛУГИ
// =========================
function openService(service){
    selectedService = service;
    showAddonQuestion();
}


// =========================
// ВОПРОС: ДОБАВИТЬ ЕЩЁ?
// =========================
function showAddonQuestion(){

    const items = document.getElementById("items");

    items.innerHTML = `

    <div class="addon-box">

        <h2>➕ Добавить дополнительную услугу?</h2>

        <p>Выберите один из вариантов</p>

        <div class="addon-grid">

            <div class="addon-card" onclick="addAndGo('⛱ Сап')">
                <h3>⛱</h3>
                <h3>Сап</h3>
                <p>500 сом</p>
            </div>

            <div class="addon-card" onclick="addAndGo('🛋 Тапчан')">
                <h3>🛋</h3>
                <h3>Тапчан</h3>
                <p>1500 сом</p>
            </div>

        </div>

        <button class="skip-btn" onclick="noAddon()">
            Продолжить без дополнительной услуги
        </button>

    </div>

    `;
}


// =========================
// ЕСЛИ НЕТ — В БРОНЬ
// =========================
function noAddon(){
    goBooking(selectedService);
}


// =========================
// ПОКАЗ ДОПОЛНИТЕЛЬНЫХ УСЛУГ
// =========================
function showAddonList(){

    const items = document.getElementById("items");

    const addons = [
        {name:"⛱ сап", price:500},
        {name:"🛋 Тапчан", price:1500}
    ];

    let html = `<h3>Выберите дополнительно:</h3>`;

    addons.forEach(a => {
        html += `
        <div class="card" onclick="addAndGo('${a.name}')">
            <h4>${a.name}</h4>
            <p>💰 ${a.price} сом</p>
        </div>
        `;
    });

    items.innerHTML = html;
}


// =========================
// ДОБАВИТЬ + ПЕРЕЙТИ
// =========================
function addAndGo(extra){
    const finalService = selectedService + " + " + extra;
    goBooking(finalService);
}


// =========================
// ПЕРЕХОД В БРОНЬ
// =========================
function goBooking(service){
    localStorage.setItem("service", service);
    window.location.href = "booking.html";
}


// =========================
// ТЕКСТ НА booking.html
// =========================
const serviceTitle = document.getElementById("serviceTitle");

if(serviceTitle){
    serviceTitle.textContent =
        "Бронирование: " + localStorage.getItem("service");
}


// =========================
// ОТПРАВКА В TELEGRAM
// =========================
function bookNow(){

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    const service = localStorage.getItem("service");

    if(!name || !phone || !startDate || !endDate){
        alert("Заполните все поля");
        return;
    }

    let text = "🏕 НОВАЯ БРОНЬ\n\n";
    text += "🏠 Услуга: " + service + "\n";
    text += "👤 Имя: " + name + "\n";
    text += "📞 Телефон: " + phone + "\n";
    text += "📅 Даты: " + startDate + " - " + endDate + "\n";

    if(startDate === endDate){
        text += "🕒 Время: " + startTime + " - " + endTime + "\n";
    }

    const token = "8703567708:AAF3LECRCcgBeoRFUTTyWIMcDrOwwi24KQk";
    const chat_id = "-1004394539402";

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: chat_id,
            text: text
        })
    });

    alert("✅ Бронь отправлена!");
}