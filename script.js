let userData = {};
let inferences = {};

function nextStage(stageNum) {
    document.querySelectorAll('.stage').forEach(stage => {
        stage.classList.add('hidden');
    });
    document.getElementById('stage' + stageNum).classList.remove('hidden');
}

function recordChoice(category, value, inference) {
    userData[category] = value;
    inferences[category] = inference;
    
    // Siirry seuraavaan vaiheeseen
    if (category === 'color') nextStage(3);
    else if (category === 'time') nextStage(4);
}

function showPersonalized() {
    nextStage(5);
    
    // Simuloi latausaikaa
    setTimeout(() => {
        let content = document.getElementById('personalized-content');
        content.innerHTML = '<h3>Sinulle räätälöity sisältö:</h3>';
        
        // Generoi "personoitua" sisältöä valintojen perusteella
        if (userData.color === 'blue' && userData.time === 'early') {
            content.innerHTML += '<p>📈 "10 tapaa tehostaa aamusi tuottavuutta"</p>';
            content.innerHTML += '<p>💼 "Miksi menestyjät heräävät aikaisin?"</p>';
        } else if (userData.color === 'red') {
            content.innerHTML += '<p>🔥 "KATSO: Tämä video saa sinut raivon partaalle!"</p>';
            content.innerHTML += '<p>😤 "Et usko mitä juuri tapahtui..."</p>';
        } else if (userData.color === 'green') {
            content.innerHTML += '<p>🌱 "Ilmastokriisi pahenee - toimi nyt!"</p>';
            content.innerHTML += '<p>🌍 "7 tapaa elää ekologisemmin"</p>';
        } else {
            content.innerHTML += '<p>🎭 "Yhteiskunta valehtelee sinulle - lue miksi"</p>';
            content.innerHTML += '<p>🔍 "Totuus, jota media ei kerro"</p>';
        }
        
        // Lisää häiritseviä elementtejä
        content.innerHTML += '<div style="margin-top: 20px; color: #666; font-size: 14px;">Näytetään sisältöä perustuen ' + Object.keys(userData).length + ' datapisteeseen...</div>';
    }, 1500);
}

function revealTruth() {
    nextStage(6);
    
    let revelations = document.getElementById('revelations');
    revelations.innerHTML = '';
    
    // Näytä kaikki päätelmät
    for (let key in inferences) {
        revelations.innerHTML += `
            <div class="inference">
                <strong>${key.toUpperCase()}:</strong> ${userData[key]} 
                → Algoritmi päätteli: <em>${inferences[key]}</em>
            </div>
        `;
    }
    
    // Lisää ylimääräisiä "päätelmiä"
    revelations.innerHTML += `
        <div class="inference">
            <strong>LISÄKSI PÄÄTELTIIN:</strong><br>
            • Tulotaso: ${userData.time === 'early' ? 'Keskitulo tai ylempi' : 'Matalampi keskitulo'}<br>
            • Poliittinen suuntaus: ${userData.color === 'green' ? 'Vasemmisto' : userData.color === 'blue' ? 'Oikeisto' : 'Keskusta'}<br>
            • Mainosten klikkaustaipumus: ${userData.pet === 'dog' ? 'Korkea' : 'Matala'}<br>
            • Impulsiivisuus: ${userData.color === 'red' ? '87%' : '34%'}
        </div>
    `;
}

function restart() {
    userData = {};
    inferences = {};
    nextStage(1);
}
