import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const DATA_PATH = path.join(__dirname, 'src/data/mascotas.json');

app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

const leerMascotas = async () => {
    try {
        const contenido = await fs.readFile(DATA_PATH, 'utf-8');
        return JSON.parse(contenido);
    } catch (error) {
        return [];
    }
};
const guardarMascotas = async (data) => await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));

// Ruta principal
app.get('/', (req, res) => {
    res.render('home', { title: 'Registro Civil de Mascotas - Chile' });
});

// Retornar todas las mascotas
app.get('/mascotas', async (req, res) => {
    try {
        const mascotas = await leerMascotas();
        res.json(mascotas);
    } catch (error) {
        res.status(500).json({ error: "Error al leer el archivo JSON" });
    }
});

// Nombre o RUT
app.get('/mascotas/buscar', async (req, res) => {
    try {
        const { nombre, rut } = req.query;
        const mascotas = await leerMascotas();
        console.log('Este es el nombre:', nombre)
        console.log('Este es el Rut:', rut)

        if (nombre) {
            const mascota = mascotas.filter(m => m.nombre.toLowerCase() === nombre.toLowerCase());
            console.log('Este es el mascota:', mascota)
            if (mascota.length === 0) return res.status(404).json({ error: 'Mascota no encontrada' });
                return res.json(mascota);
        }
        if (rut) {
            const filtradas = mascotas.filter(m => m.rutDueño === rut);
            return res.json(filtradas);
        }
        res.status(400).json({ error: 'Debe proporcionar un nombre o RUT' });
    } catch (error) {
        res.status(500).json({ error: "Error en la búsqueda" });
    }
});

// Inserta una mascota
app.post('/mascotas', async (req, res) => {
    try {
        const { nombre, rutDueño } = req.body;
        if (!nombre || !rutDueño) return res.status(400).json({ error: "Datos incompletos" });
        const mascotas = await leerMascotas();
        mascotas.push({ nombre, rutDueño });
        await guardarMascotas(mascotas);
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "No se pudo guardar la mascota" });
    }
});

// Nombre o RUT
app.delete('/mascotas', async (req, res) => {
    try {
        const { nombre, rut } = req.query;
        let mascotas = await leerMascotas();

        if (nombre) {
            mascotas = mascotas.filter(m => m.nombre.toLowerCase() !== nombre.toLowerCase());
        } else if (rut) {
            mascotas = mascotas.filter(m => m.rutDueño !== rut);
        } else {
            return res.status(400).json({ error: "Faltan parámetros para eliminar" });
        }

        await guardarMascotas(mascotas);
        res.json({ success: true, message: "Registro(s) eliminado(s) correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al intentar eliminar" });
    }
});

app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Página no encontrada - 404' 
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});