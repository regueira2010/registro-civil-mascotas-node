const obtenerTodas = async () => {
    try {
        const { data } = await axios.get('/mascotas'); 
        renderizarTabla(data);
    } catch (error) {
        console.error("Error detallado:", error);
        alert("Error al cargar los datos: " + (error.response?.data?.error || "Servidor no responde"));
    }
};
document.getElementById('formMascota').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const rutDueño = document.getElementById('rut').value;

    try {
        await axios.post('/mascotas', { nombre, rutDueño });
        e.target.reset();
        obtenerTodas();
    } catch (error) {
        alert("No se pudo registrar la mascota.");
    }
});

const eliminarMascota = async (nombre) => {
    if (!confirm(`¿Eliminar a ${nombre}?`)) return;
    try {
        await axios.delete(`/mascotas?nombre=${nombre}`);
        obtenerTodas();
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
};

const eliminarPorRut = async () => {
    const rut = document.getElementById('searchRut').value;
    if (!rut || !confirm(`¿Eliminar TODAS las mascotas del RUT ${rut}?`)) return;
    try {
        await axios.delete(`/mascotas?rut=${rut}`);
        document.getElementById('searchRut').value = "";
        obtenerTodas();
    } catch (error) {
        alert("Error al eliminar registros por RUT.");
    }
};

const renderizarTabla = (mascotas) => {
    const tbody = document.getElementById('listaMascotas');
    tbody.innerHTML = ""; 

    const lista = Array.isArray(mascotas) ? mascotas : [mascotas];

    lista.forEach(m => {
        if(m.nombre) {
            tbody.innerHTML += `
                <tr>
                    <td class="fw-bold">${m.nombre}</td>
                    <td>${m.rutDueño}</td>
                    <td class="text-center">
                        <button class="btn btn-danger btn-sm" onclick="eliminarMascota('${m.nombre}')">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `;
        }
    });
};

const buscarPorRut = async () => {
    const rutParaBuscar = document.getElementById('searchRut').value;
    if (!rutParaBuscar) return alert("Ingrese un RUT");
    window.history.pushState({}, '', `/mascotas/buscar?rut=${rutParaBuscar}`);
    try {
        const { data } = await axios.get(`/mascotas/buscar?rut=${rutParaBuscar}`);

        if (Array.isArray(data) && data.length > 0) {
            renderizarTabla(data);
            
            const etiquetaTotal = document.getElementById('totalMascotas');
            if (etiquetaTotal) {
                etiquetaTotal.innerText = `Resultados: ${data.length}`;
            }
        } else {
            alert("No se encontraron mascotas asociadas a ese RUT.");
        }
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        alert("Hubo un error al intentar buscar por RUT.");
    }
};

const buscarPorNombre = async () => {
    const nombreParaBuscar = document.getElementById('searchName').value;
    if (!nombreParaBuscar) return alert("Ingrese un Nombre");

    window.history.pushState({}, '', `/mascotas/buscar?nombre=${nombreParaBuscar}`);
    try {
        const { data } = await axios.get(`/mascotas/buscar?nombre=${nombreParaBuscar}`);

        if ((Array.isArray(data) && data.length > 0)) {
            renderizarTabla(data);
            
            const etiquetaTotal = document.getElementById('totalMascotas');
            if (etiquetaTotal) {
                const cantidad = Array.isArray(data) ? data.length : 1;
                etiquetaTotal.innerText = `Resultados: ${cantidad}`;
            }
        } else {
            alert("No se encontraron mascotas asociadas a ese Nombre.");
        }
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        alert("Hubo un error al intentar buscar por Nombre.");
    }
};

const eliminarPorNombre = async () => {
    const nombre = document.getElementById('searchName').value;
    if (!nombre || !confirm(`¿Eliminar TODAS las mascotas con Nombre ${nombre}?`)) return;
    try {
        await axios.delete(`/mascotas?nombre=${nombre}`);
        document.getElementById('searchName').value = "";
        obtenerTodas();
    } catch (error) {
        alert("Error al eliminar registros por Nombre.");
    }
};

obtenerTodas();