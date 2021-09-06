function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

let userData;
try {
    userData = JSON.parse(atob(getCookie('express:sess')));
    userData = userData.passport.user;
} catch (err) {
    console.log('Parse userData err: ', err);
}

if (userData) {
    const name = document.getElementById('name');
    name.innerText = userData.displayName;
    name.style.fontWeight = 'bold';

    const avatar = document.createElement('img');
    avatar.setAttribute('src', userData.profile_image_url);
    avatar.setAttribute('height', '50');
    avatar.setAttribute('width', '50');
    avatar.setAttribute('alt', 'Avatar');
    document.getElementById('avatar').appendChild(avatar);

    const chat = document.getElementById('chat');
    chat.style.width = '500px';
    chat.style.height = '500px';
    chat.style.overflow = 'scroll';
    chat.style.overflowX = 'hidden';
    chat.style.overflowY = 'auto';

    const client = new tmi.Client({
        connection: {
            secure: true,
            reconnect: true
        },
        channels: [userData.login]
    });

    client.connect();
    client.on('message', (wat, tags, message, self) => {
        if (self) {
            return;
        }

        const textStyle = tags['display-name'] === userData.displayName ? 'b' : 'i';
        const msg = document.createElement('div');
        msg.innerHTML = `<${textStyle}>${tags['display-name']}:</${textStyle}> ${message}`;
        msg.style.marginLeft = '5px';
        msg.style.marginTop = '5px';
        chat.appendChild(msg);
    });
}
