const targets = document.querySelectorAll('[data-target]');
const content = document.querySelectorAll('[data-content]');

targets.forEach(target => {
    target.addEventListener('click', () => {
        content.forEach(c => {
            c.classList.remove('active');
        });
        const t = document.querySelector(target.dataset.target);
        t.classList.add('active');
        
        // Comprueba si el objetivo clicado es "iniciarSesion" o "paginaPrincipal" y agrega ambas clases "active" si es necesario.
        if (t.id === 'iniciarSesion' || t.id === 'registrarse') {
            const paginaPrincipal = document.querySelector('#paginaPrincipal');
            paginaPrincipal.classList.add('active');
        }
    });
});

var buttonUser = document.getElementById('button-user');
var iniciarRegistrarse = document.getElementById('iniciarRegistrarse');

buttonUser.addEventListener('click', function(event) {
    event.stopPropagation();
    iniciarRegistrarse.style.display = 'block';
});

document.addEventListener('click', function(event) {
    if (event.target !== buttonUser && event.target !== iniciarRegistrarse) {
        iniciarRegistrarse.style.display = 'none';
    }
});

iniciarRegistrarse.addEventListener('click', function(event) {
    event.stopPropagation();
});

document.getElementById('comprar').addEventListener('click', function() {
    alert('Compra exitosa');
});

// Registro e inicio de sesion LOCALSTORAGE 
// Registro
document.getElementById('btnRegistrarse').addEventListener('click', function() {
    
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var number = document.getElementById('number').value;
    var direccion = document.getElementById('direccion').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (name === ''){
        console.log('El nombre ', name, ' es invalido');
        return;
    }
    if (lastName === ''){
        console.log('El apellido ', lastName, ' es invalido');
        return;
    }
    if (email === ''){
        console.log('El email ', email, ' es invalido');
        return;
    }
    if (password === '' || password != confirmPassword){
        console.log('La contraseña ', password, ' es invalido');
        return;
    }
    if (number === ''){
        console.log('El numero ', number, ' es invalido');
        return;
    }

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var isEmailRegitered = users.some(function(user){
        return user.email === email;
    });

    if (isEmailRegitered){
        alert("Correo ya registrado.");
        return;
    }

    let newUser = {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        direccion: direccion,
        cart: [],
        total: 0
    }

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('usrNme').textContent = name + ' ' + lastName;
    document.getElementById('nameImp').textContent = name + ' ' + lastName;
    document.getElementById('emailImp').textContent = email;

    alert('Registrado exitosamente.');

});

// Inicio de sesion
document.getElementById('iniIni').addEventListener('click', function(){
    var email = document.getElementById('emailIni').value;
    var password = document.getElementById('passIni').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var foundUser = users.find(function(user) {
        return user.email === email;
    });

    if (foundUser) {
        if (foundUser.password === password) {
            alert('Bienvenido ' + foundUser.name + ' ' + foundUser.lastName);
            document.getElementById('usrNme').textContent = foundUser.name + ' ' + foundUser.lastName;
            document.getElementById('nameImp').textContent = foundUser.name + ' ' + foundUser.lastName;
            document.getElementById('emailImp').textContent = foundUser.email;
        }
    } else {
        alert('Email o contraseña incorrecta');
    }

});

//eliminar producto (uno menos)
document.getElementById('eliminarProducto_1').addEventListener('click', function(){
    eliminarProducto('producto_1');
});

document.getElementById('eliminarProducto_2').addEventListener('click', function(){
    eliminarProducto('producto_2');
});

document.getElementById('eliminarProducto_3').addEventListener('click', function(){
    eliminarProducto('producto_3');
});

function eliminarProducto(id) {
    var email = document.getElementById('emailImp').textContent;
    var users = JSON.parse(localStorage.getItem('users')) || [];

    var foundUser = users.find(function(user) {
        return user.email === email;
    });

    if (foundUser) {
        var foundCartProduct = foundUser.cart.find(function(producto) {
            return producto.id === id;
        });

        if (foundCartProduct) {
            if (foundCartProduct.cant > 0) {
                foundCartProduct.cant--;
               
                localStorage.setItem('users', JSON.stringify(users));

                console.log('Producto ' + id + ' eliminado. Nueva cantidad: ' + foundCartProduct.cant);
            } else {
                console.log('El producto ' + id + ' ya tiene una cantidad de 0.');
            }
        } else {
            console.log('El producto ' + id + ' no se encuentra en el carrito.');
        }
        mostrarCar();
    }
}

//agregar producto (uno mas)
document.getElementById('agregarProducto_1').addEventListener('click', function(){
    agregarProducto('producto_1');
});

document.getElementById('agregarProducto_2').addEventListener('click', function(){
    agregarProducto('producto_2');
});

document.getElementById('agregarProducto_3').addEventListener('click', function(){
    agregarProducto('producto_3');
});

function agregarProducto(id) {
    var email = document.getElementById('emailImp').textContent;
    var users = JSON.parse(localStorage.getItem('users')) || [];

    var foundUser = users.find(function(user) {
        return user.email === email;
    });

    if (foundUser) {
        var foundCartProduct = foundUser.cart.find(function(producto) {
            return producto.id === id;
        });

        if (foundCartProduct) {
            foundCartProduct.cant++;

            localStorage.setItem('users', JSON.stringify(users));

            console.log('Producto ' + id + ' agregado. Nueva cantidad: ' + foundCartProduct.cant);
        } else {
            console.log('El producto ' + id + ' no se encuentra en el carrito.');
        }
        mostrarCar();
    }
}


//mostrar producto
document.getElementById('agregarProductoBoton_1').addEventListener('click', function(){
    agregarProductoCar('producto_1');
});
document.getElementById('agregarProductoBoton_2').addEventListener('click', function(){
    agregarProductoCar('producto_2');
});
document.getElementById('agregarProductoBoton_3').addEventListener('click', function(){
    agregarProductoCar('producto_3');
});

function agregarProductoCar(id){
    var email = document.getElementById('emailImp').textContent;
    var users = JSON.parse(localStorage.getItem('users')) || [];

    var foundUser = users.find(function(user) {
        return user.email === email;
    });

    console.log('Usuario encontrado:', foundUser);

    if (foundUser) {
        console.log('Carrito del usuario:', foundUser.cart);

        var foundCart = foundUser.cart.find(function(producto){
            return producto.id === id;
        });

        var cant = 1;

        if (foundCart){
            foundCart.cant = foundCart.cant + 1;
        } else {
            foundUser.cart.push({id: id, cant: 1});
        }

        var produc = document.getElementById(id);
        if (produc) {
            produc.style.display = 'block';
        }

        console.log('Usuario después de agregar producto:', foundUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

//mostrar en carrito de nuevo
document.getElementById('carritoBoton').addEventListener('click', function(){
    mostrarCar();
});

function mostrarCar(){
    var email = document.getElementById('emailImp').textContent;
    var users = JSON.parse(localStorage.getItem('users')) || [];

    var foundUser = users.find(function(user) {
        return user.email === email;
    });

    console.log('Usuario encontrado:', foundUser);

    if (foundUser) {
        console.log('Carrito del usuario:', foundUser.cart);
        
        if (foundUser.cart.length > 0) {
            console.log('IDs de productos en el carrito:');
            foundUser.cart.forEach(function(producto) {
                var element = document.getElementById(producto.id);
                if (element) {
                    element.style.display = 'block';

                    if (producto.id ==='producto_1'){
                        console.log('element' + producto.id);
                        document.getElementById('cantProducto_1').textContent = ' ' + producto.cant;
                        console.log(producto.cant);
                    }else if (producto.id ==='producto_2'){
                        console.log('element' + producto.id);
                        document.getElementById('cantProducto_2').textContent = ' ' + producto.cant;
                        console.log(producto.cant);
                    }else if (producto.id ==='producto_3'){
                        console.log('element' + producto.id);
                        document.getElementById('cantProducto_3').textContent = ' ' + producto.cant;
                        console.log(producto.cant);
                    }else{
                        console.log('element');
                    }
                }
            });
        } else {
            console.log('El carrito está vacío.');
        }
    }
}

// prueba de objeto

