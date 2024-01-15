// Define variables
const cityNames = ['Katrineholm','Stockholm','Gothenburg','Malmö','Uppsala','Norrköping','Västerås','Örebro','Linköping','Helsingborg','Jönköping','Vimmerby','Sundsvall','Gävle','Umeå','Karlstad','Södertälje','Halmstad',,'Eskilstuna','Karlskrona','Växjö','Borås','Täby','Trollhättan','Östersund','Luleå','Trelleborg','Kalmar','Lidköping','Skövde','Nyköping','Tumba','Falun','Västervik','Varberg','Uddevalla','Landskrona','Lidingö','Ystad','Lund'];
const iconList = [
    'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    'https://cdn-icons-png.flaticon.com/256/1384/1384060.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png',
    'https://cdn-icons-png.flaticon.com/512/4138/4138198.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png',
    'https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png',
    'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png'
];
const weatherCondition = {
    clear: 'https://cdn3.iconfinder.com/data/icons/weather-forecast-48/231/sunny-512.png',
    rainy: 'https://cdn-icons-png.flaticon.com/512/899/899525.png',
    cloudy: 'https://cdn-icons-png.flaticon.com/512/1163/1163736.png',
    snowy: 'https://cdn-icons-png.flaticon.com/512/1247/1247131.png',
    fogy: 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png',
    partyCloudy: 'https://cdn3.iconfinder.com/data/icons/weather-forecast-48/231/sunny-512.png',
    drizzle: 'https://cdn-icons-png.flaticon.com/512/7349/7349383.png',
    haze: 'https://cdn-icons-png.flaticon.com/512/4151/4151022.png',
    unone: 'https://cdn-icons-png.flaticon.com/512/5829/5829172.png'
}
const colorsList = ['#da0', '#2fbf40', '#58afd4', '#ed6c6c', '#9b6ff4', '#fb8dff', '#ff8da4', '#b58379'];
const cityNameText = document.getElementById('cityNameText');
const cityNamesWrapper = document.getElementById('cityNamesWrapper');
const addNewLinkMenu = document.getElementById('addNewLinkMenu');
let iconChose = '';
const newLinkIconWrapper = document.getElementById('newLinkIconWrapper');
const linkText =  document.getElementById('linkText');
const linkNameText =  document.getElementById('linkNameText');
const dashboardName = document.getElementById('dashboardName');
const dashboardNameText = document.getElementById('dashboardNameText');
const addNewNote = document.getElementById('addNewNote');
const noteTitleText = document.getElementById('noteTitleText');
const noteContentText = document.getElementById('noteContentText');
const noteWrapper = document.getElementById('noteWrapper');
let colorRnd;
let titleAneContent = [];
let allowAddNote = true;


// Set dashboard name from localstorage if found
if(localStorage.dashboardName == undefined || localStorage.dashboardName == ''){
    dashboardName.textContent = 'Mustafa Dashboard';
    localStorage.dashboardName = dashboardName.textContent;
} else {
    dashboardName.textContent = localStorage.dashboardName;
}

dashboardNameText.addEventListener('input', () => {
    localStorage.dashboardName = dashboardNameText.value;
    dashboardName.textContent = dashboardNameText.value;
});


document.addEventListener('click', (evt) => {
    if(evt.target.id == 'addLinkWrapper') // Show add link setting menu
    addNewLinkMenu.style.display = 'flex';
    else if( evt.target.id == 'closeNewAddLinkMenu'){
        resetAddNewLinkMenu();
    }
    else if(evt.target.className == 'icons')
    iconChose = evt.target.src;
    else if(evt.target.className == 'delLink centeredElement'){ // Delete added link
        let idName = evt.target.id;
        let linkId = document.getElementById(idName.slice(0, idName.length - 3));
        linkId.style.transform = 'translateY(200px)';
        linkId.style.opacity = 0;
        setTimeout(() => {
            linkId.remove();
            linksToLocalStorage();
        }, 400);
    }
    else if(evt.target.className == 'link centeredElement')
    window.open(`https://${evt.target.id}.com`);
    else if(evt.target.id == 'dashboardName' || evt.target.id == 'dashboardNameText'){
        dashboardNameText.style.display = 'inline';
        dashboardNameText.value = dashboardName.textContent;
        dashboardName.style.pointerEvents = 'none';
    } else {
        dashboardNameText.style.display = 'none';
        dashboardName.style.pointerEvents = 'unset';
    }

    if(evt.target.id == 'addNewNote'){
        document.getElementById('notSettingsMenu').style.display = 'block';
        noteTitleText.focus();
    }
    else if( evt.target.id == 'closeNotSettingsMenu')
    document.getElementById('notSettingsMenu').style.display = 'none';
});


let resetAddNewLinkMenu = () => {
    addNewLinkMenu.style.display = 'none';
    linkNameText.value = '';
    linkText.value = '';
    iconChose = '';
}


// Create icon list for the add new link icon menu
(() => {
    iconList.forEach((icon) => {
        newLinkIconWrapper.innerHTML += `<img src="${icon}" alt="" class="icons">`;
    });
})();

// Add new link function
const addNewLink = () => {
    if(linkText.value != ''
    && linkNameText.value != ''
    && iconChose != ''){
        createLinkComponent(linkNameText.value, linkText.value, iconChose);
        resetAddNewLinkMenu();
        linksToLocalStorage();
    }
}

let createLinkComponent = (name, link, icon) => {
    let newLinkComponent = `<div id="${link}" class="link centeredElement">
    <p>Snabblänk till</p>
    <h2>${name}</h2>
    <img src="${icon}" alt="Link is not available">
    <h5 title="Tabort" class="delLink centeredElement" id="${link}Del">X</h5>
    </div>`;
    document.getElementById('linksWrapper').innerHTML += newLinkComponent;
    document.getElementById(link).style.transform = 'translateY(-200px)';
    document.getElementById(link).style.opacity = 0;
    setTimeout(() => {
        document.getElementById(link).style.transform = 'translateY(0)';
        document.getElementById(link).style.opacity = 1;
    });
}
if(localStorage.names == undefined || localStorage.names == ''){
    createLinkComponent('Google', 'google', 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png');
    createLinkComponent('YouTube', 'youtube', 'https://cdn-icons-png.flaticon.com/256/1384/1384060.png');
    createLinkComponent('Instagram', 'instagram', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png');
    createLinkComponent('Tiktok', 'tiktok', 'https://cdn-icons-png.flaticon.com/512/4138/4138198.png');
} else {
    for(let i = 0; i < localStorage.names.split(',').length; i++){
        createLinkComponent(localStorage.names.split(',')[i],
        localStorage.links.split(',')[i],
        localStorage.icons.split(',')[i]);
    }
}

let linksToLocalStorage = () => {
    let allNames = [];
    let allIcons = [];
    let allLinks = [];
    let link = document.getElementsByClassName('link centeredElement');
    for(let i = 0; i < link.length; i++){
        allNames.push(link[i].querySelector('h2').textContent);
        allIcons.push(link[i].querySelector('img').src);
        allLinks.push(link[i].querySelector('h5').id.slice(0, link[i].querySelector('h5').id.length-3));
    }
    localStorage.names = allNames;
    localStorage.icons = allIcons;
    localStorage.links = allLinks;
}
linksToLocalStorage();


// Create weather section


//Fetch current location
const http = new XMLHttpRequest();

function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        http.open("GET", `https://api-bdc.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`);
        http.send();
        http.onreadystatechange = function() {
            getWeatherApi(JSON.parse(this.responseText).locality);
        }
    });
}
getLocation();


//Fetching API from current weather
let getWeatherApi = async (city) => {
    let weather = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c78af24848df25b49bcd9289652bf85&units=metric`);
    let weatherData = await weather.json();
    document.getElementById('cityName').textContent = weatherData.name;
    document.getElementById('tempLabel').textContent = Math.round(weatherData.main.temp) + '°';
    document.getElementById('weatherConditionLabel').textContent = weatherData.weather[0].main;
    if(weatherData.weather[0].main == 'Clear')
    document.getElementById('weatherImage').src = weatherCondition.clear;
    else if(weatherData.weather[0].main == 'Clouds')
    document.getElementById('weatherImage').src = weatherCondition.cloudy;
    else if(weatherData.weather[0].main == 'Snow')
    document.getElementById('weatherImage').src = weatherCondition.snowy;
    else if(weatherData.weather[0].main == 'Fog')
    document.getElementById('weatherImage').src = weatherCondition.fogy;
    else if(weatherData.weather[0].main == 'Rain')
    document.getElementById('weatherImage').src = weatherCondition.rainy;
    else if(weatherData.weather[0].main == 'Mist')
    document.getElementById('weatherImage').src = weatherCondition.fogy;
    else if(weatherData.weather[0].main == 'Drizzle')
    document.getElementById('weatherImage').src = weatherCondition.drizzle;
    else if(weatherData.weather[0].main == 'Haze')
    document.getElementById('weatherImage').src = weatherCondition.haze;
    else
    document.getElementById('weatherImage').src = weatherCondition.unone;
}


// Set the time and date
setInterval(() => {
    dateAndTime();
}, 1000);

let dateAndTime = () => {
    let newDate = new Date().toLocaleString();
    document.getElementById('theDate').textContent = newDate.split(',')[0];
    document.getElementById('theTime').textContent = newDate.split(',')[1];
}
dateAndTime();

// Create city list
(() => {
    cityNames.forEach((city) => {
        cityNamesWrapper.innerHTML += `<p>${city}</p>`;
    });
})();


// Search for city
cityNameText.addEventListener('input', () => {
    let cityFoundNumver = 0;
    for(let i = 0; i < cityNames.length; i++){
        cityNamesWrapper.children[i].style.display = 'none';
        document.getElementById('addMissingCityBtn').style.display = 'none';
        if(cityNamesWrapper.children[i].textContent.includes(cityNameText.value)){
            cityNamesWrapper.children[i].style.display = 'block';
            cityFoundNumver ++;
        }
    }
    if(cityFoundNumver == 0)
    document.getElementById('addMissingCityBtn').style.display = 'block';
});


// Get chosen city weather
cityNamesWrapper.addEventListener('click', (evt) => {
    if(evt.target.tagName == 'P')
    getWeatherApi(evt.target.textContent);
    else if(evt.target.id == 'addMissingCityBtn')
    getWeatherApi(cityNameText.value);
});


// Fetch news
const fetchNews = async() =>{
    let res = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=UKDLngtMYIubrFbxCaSGiEgGVmt4fScB');
    let data = await res.json();
    for(let i = 0; i < 6; i++){
        let newsObject = {
            number: i+1,
            title: data.results[i].title,
            content: data.results[i].abstract,
        }
        createNews(newsObject);
    }
}
fetchNews();

let createNews = (news) => {
    let newsComponent = `
    <div class="news" id="news${news.number}">
        <img src="https://cdn.abcotvs.com/dip/images/12721160_2023-wabc-NewApp-NewYorkCity.jpg" alt="">
        <div>
            <h5>${news.title}</h5>
            <h6>${news.content.slice(0, 50)}...</h6> 
        </div>
    </div>
    `;
    newsWrapper.innerHTML += newsComponent;
}


// Note section
document.getElementById('addNewNoteBtn').onclick = () => {
    if(noteTitleText.value != '' && noteContentText.value != ''){
        createNewNote(noteTitleText.value, noteContentText.value);
        document.getElementById('notSettingsMenu').style.display = 'none';
        noteTitleText.value = '';
        noteContentText.value = '';
    }
}

let createNewNote = (title, content) => {
    titleAneContent.push(title + '|' + content);
    localStorage.notes = titleAneContent;
    createNoteComponentFunction(title, content);
}

function createNoteComponentFunction(title, content){
    colorRnd = Math.ceil(Math.random()*colorsList.length);
    let noteComponent = `
    <div class="note" id="${title}|${content}" style="transform: scale(0)">
        <div class="centeredElement" style="background: ${colorsList[colorRnd]}">
            <h1><i class="fas fa-quote-left"></i></h1>
        </div>
        <div class="centeredElement">
            <h2 style="color: ${colorsList[colorRnd]}">${title}</h2>
            <p>${content}</p>
        </div>
        <h3 id="${title}|${content}Del" title="Delete note" style="color: ${colorsList[colorRnd]}"><i class="fas fa-trash-alt" style="color: ${colorsList[colorRnd]}"></i></h3>
    </div>
    `;
    for(let i = 0; i < document.getElementsByClassName('note').length; i++)
    if(document.getElementsByClassName('note')[i].id == title + '|' + content){
        allowAddNote = false;
        break;
    }
    else
    allowAddNote = true;
    if(allowAddNote == true)
    noteWrapper.innerHTML += noteComponent;
    setTimeout(() => {
        document.getElementById(title + '|' + content).style.transform = 'scale(1)';
    });
}


// Avoiding writing "," to avoid misstakes. This can be solved by another way.
noteContentText.addEventListener('input', () => {
    if(noteContentText.value.includes(',')){
        let result = noteContentText.value.replace(/,/g, ";");
        noteContentText.value = result;
    }
});

noteTitleText.addEventListener('input', () => {
    if(noteTitleText.value.includes(',')){
        let result = noteTitleText.value.replace(/,/g, ";");
        noteTitleText.value = result;
    }
});

//delete localStorage.notes
if(localStorage.notes != undefined && localStorage.notes != ''){
    for(let i = 0; i < localStorage.notes.split(',').length; i++){
        titleAneContent.push(localStorage.notes.split(',')[i]);
        createNoteComponentFunction(localStorage.notes.split(',')[i].split('|')[0], localStorage.notes.split(',')[i].split('|')[1]);
    }
}

noteWrapper.addEventListener('click', (evt) => {
    if(evt.target.title == 'Delete note'){
        titleAneContent = [];
        let note = document.getElementById(evt.target.id.slice(0, evt.target.id.length-3));
        note.style.transform = 'rotate(80deg) translate(-70px, 50px)';
        setTimeout(() => {
            note.style.transform = 'rotate(100deg) translate(200px, 50px)';
            note.style.opacity = 0;
        }, 200);
        setTimeout(() => {
            note.remove();
            for(let i = 0; i < document.getElementsByClassName('note').length; i++)
            titleAneContent.push(document.getElementsByClassName('note')[i].id);
            localStorage.notes = titleAneContent;
        }, 400);
    }
});


// Change background section
const fetchImage = async () => {
    const res = await fetch('https://api.unsplash.com/photos/?client_id=8gtppOmNy8j-1VREqGE7jyieb_dSwmbCucYHoeC10gQ');
    const data = await res.json();
    console.log(data[0].urls)
    let rnd = Math.ceil(Math.random()*10);
    setBackgroundImage(data[rnd].urls.full)
}

const setBackgroundImage = (img) => {
    document.body.style.background = `url('${img}')`;
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
}