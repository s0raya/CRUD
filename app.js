const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req,res) => {
    res.redirect('/usuarios');
})


app.get('/usuarios', (req,res) => {
    res.json(usuarios)
});

app.get('/usuarios/:nombre', (req,res) => {
    const nombreUsuario = req.params.nombre;
    const usuarioEncontrado = usuarios.find(usuario => usuario.nombre === nombreUsuario);

    if (usuarioEncontrado) {
        res.json(usuarioEncontrado)
    } else {
        res.status(404).send('Usuario no encontrado')
    }
})

app.post('/usuarios', (req,res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        ...req.body
    }
    usuarios.push(nuevoUsuario);
    res.json(usuarios);
});


/****************** BONUS *************************/

app.put('/usuarios/:nombre', (req,res) => {
    const nombreUsuario = req.params.nombre;
    const index = usuarios.findIndex(usuario => usuario.nombre === nombreUsuario);

    if (index !== -1) {
        usuarios[index] = {
           id: usuarios[index].id,
            ...req.body};
        res.json(usuarios);
    } else {
        res.status(404).send('Usuario no encontrado')
    }
});

app.delete('/usuarios/:nombre', (req,res) => {
    const nombreUsuario = req.params.nombre;
    const deleteUsuario = usuarios.find(usuario => usuario.nombre === nombreUsuario);
    if (deleteUsuario) {
        usuarios = usuarios.filter(usuario => usuario.nombre !== nombreUsuario);
        nextUserId = 1;
        usuarios.forEach(user => {
            user.id = nextUserId++
        });
        res.json(usuarios);
    } else {
        res.status(404).send('Usuario no encontrado')
    }
})

app.use((req,res) => {
    res.status(404).send('<h1>Página no encontrada</h1>')
});



app.listen(3000, () => {
    console.log(`El servidor está activo en http://localhost:3000`);
});
