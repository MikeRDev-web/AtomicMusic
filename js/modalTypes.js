
let userActive = false;
let usersRegister = [
    {
        userName: 'Miguel',
        password: '123',
        email: 'miguel@atomicmusic.com'
    },
    {
        userName: 'Luis',
        password: 'Luis1',
        email: 'miguel@atomicmusic.com'
    }
]

let headerNav = document.getElementById('headerNav');
let favoriteMessage = document.getElementById('favoriteMessage');
let loginBtnInHeader = document.getElementById('loginBtnInHeader');

function insertInModal(type, container) {
    const section = document.getElementById(`${container}`);
    if(type === 'login'){
        section.style.display = 'flex';
        section.innerHTML = ` <div class="login" id='loginContent'>
        <img src="/src/images/icons/closeIcon.svg" alt="close" class="modal__close" onClick="closeWindows(${container}, 'loginContent')">
        <span class="login__content">
            <h2>Inicio de sesión</h1>
            <div class="login__inputs">
                <p>Nombre de usuario:</p>
                <input type="text" class="login__inputs-input" id='userName'>
                <p>Contraseña:</p>
                <input type="password" class="login__inputs-input" id='password'>
            </div>
            <div class="login__options">
                <button class="login__options-btn" id='loginBtn'>Iniciar sesión</button>
                <button class="login__options-btn" onClick="clearModal('loginContent'), insertInModal('register', 'modalContainer')">Registrarse</button>
            </div>
        </span>
    </div>`;
        let loginBtn = document.getElementById('loginBtn');
        let userEmail = document.getElementById('userName');
        let userPassword = document.getElementById('password');
        loginBtn.addEventListener('click', ()=>{
            let searchResult = searchUser(userEmail.value, userPassword.value);
            if(searchResult.userFind) {
                clearModal('loginContent')
                section.style.display = 'none';
                userActive = true;
                loginBtnInHeader.textContent = '';
                loginBtnInHeader.removeAttribute('onClick');
                loginBtnInHeader.setAttribute('id', `${searchResult.userName}Panel`);
                loginBtnInHeader.textContent = `${searchResult.userName}`;
                
                console.log('Se ha cambiado el texto del boton login')
                console.log(`se inicio sesion y el estado del usuario cambio a ${userActive}`);
                favoriteMessage.remove();
            } else {
                userEmail.setAttribute('placeholder', "Usuario incorrecto");
                userPassword.setAttribute('placeholder', "Contraseña incorrecta");
                userEmail.value = '';
                userPassword.value = '';
            }
        })


    } else if (type === 'register') {
        section.innerHTML = `<div class="login" id='registerContent'>
        <img src="/src/images/icons/closeIcon.svg" alt="close" class="modal__close" onClick="closeWindows(${container}, 'registerContent')">
        <span class="login__content">
            <h2>Registro</h1>
            <div class="login__inputs">
                <p>Nombre de usuario</p>
                <input type="text" class="login__inputs-input">
                <p>Correo:</p>
                <input type="email" class="login__inputs-input">
                <p>Contraseña:</p>
                <input type="password" class="login__inputs-input">
            </div>
            <div class="login__options">
                <button class="login__options-btn" onClick="clearModal('registerContent'), insertInModal('login', 'modalContainer')">Iniciar sesión</button>
                <button class="login__options-btn">Registrarse</button>
            </div>
        </span>
    </div>`
    }
}

function closeWindows(window, content){
    const contentToRemove = document.getElementById(`${content}`);
    contentToRemove.remove();
    window.style.display = 'none';
}

function clearModal(content) {
    const contentToRemove = document.getElementById(`${content}`);
    contentToRemove.remove();
}

function searchUser(userInQuestion, passwordInQuestion) {
    let resulst = {
        userFind: undefined,
        userName: undefined
    };
    
    const foundUser = usersRegister.find(userObj => {
        return userObj.userName === userInQuestion && userObj.password === passwordInQuestion;
    })

    if(foundUser) {
        resulst.userFind = true;
        resulst.userName = `@${userInQuestion}`;
        console.log('Si se localizo al usuario');
    } else {
        console.log('No se localizo al usuario');
        resulst.userFind = false;
    }
    return resulst;
}