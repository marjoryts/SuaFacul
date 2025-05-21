const container = document.querySelector('.container');
const regiserBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

regiserBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// google
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); 
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('Usuário saiu');
    });
}

// github
fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        client_id: 'SEU_CLIENT_ID',
        client_secret: 'SEU_CLIENT_SECRET',
        code: 'CÓDIGO_RECEBIDO',
        redirect_uri: 'URL_DE_REDIRECIONAMENTO'
    })
})
.then(response => response.json())
.then(data => {
    console.log('Access Token:', data.access_token);
});