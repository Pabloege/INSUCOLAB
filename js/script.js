/* =========================================================
   INSUCOLAB - JAVASCRIPT
   Menú móvil
   Filtros y buscador
   Galería de fotografías
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MENÚ MÓVIL
       ===================================================== */

    const menuMovil = document.getElementById("menuMovil");
    const navLinks = document.getElementById("navLinks");

    if (menuMovil && navLinks) {

        menuMovil.addEventListener("click", function () {

            const abierto =
                navLinks.classList.toggle("menu-abierto");

            menuMovil.setAttribute(
                "aria-expanded",
                abierto ? "true" : "false"
            );

            menuMovil.setAttribute(
                "aria-label",
                abierto ? "Cerrar menú" : "Abrir menú"
            );

            menuMovil.textContent =
                abierto ? "✕" : "☰";

        });


        /* Cerrar menú al seleccionar una opción */

        const enlacesMenu =
            navLinks.querySelectorAll("a");

        enlacesMenu.forEach(function (enlace) {

            enlace.addEventListener("click", function () {

                navLinks.classList.remove("menu-abierto");

                menuMovil.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuMovil.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );

                menuMovil.textContent = "☰";

            });

        });

    }


    /* =====================================================
       BUSCADOR Y FILTROS
       ===================================================== */

    const buscador =
        document.getElementById("buscadorLaboratorio");

    const filtroSistema =
        document.getElementById("filtroSistema");

    const filtroRam =
        document.getElementById("filtroRam");

    const limpiarFiltros =
        document.getElementById("limpiarFiltros");

    const cantidadResultados =
        document.getElementById("cantidadResultados");

    const sinResultados =
        document.getElementById("sinResultados");

    const laboratorios =
        document.querySelectorAll(
            ".tarjeta-laboratorio"
        );


    function filtrarLaboratorios() {

        const texto =
            buscador
                ? buscador.value.toLowerCase().trim()
                : "";

        const sistema =
            filtroSistema
                ? filtroSistema.value
                : "todos";

        const ram =
            filtroRam
                ? filtroRam.value
                : "todos";

        let visibles = 0;


        laboratorios.forEach(function (laboratorio) {

            const nombre =
                (
                    laboratorio.dataset.nombre || ""
                ).toLowerCase();

            const sistemaLaboratorio =
                laboratorio.dataset.sistema || "";

            const ramLaboratorio =
                laboratorio.dataset.ram || "";


            const coincideTexto =
                nombre.includes(texto);


            const coincideSistema =
                sistema === "todos" ||
                sistemaLaboratorio === sistema;


            const coincideRam =
                ram === "todos" ||
                ramLaboratorio === ram;


            if (
                coincideTexto &&
                coincideSistema &&
                coincideRam
            ) {

                laboratorio.style.display = "";

                visibles++;

            } else {

                laboratorio.style.display = "none";

            }

        });


        /* Actualizar contador */

        if (cantidadResultados) {

            cantidadResultados.textContent =
                "Mostrando " +
                visibles +
                " laboratorios";

        }


        /* Mostrar mensaje si no existen resultados */

        if (sinResultados) {

            sinResultados.style.display =
                visibles === 0
                    ? "block"
                    : "none";

        }

    }


    /* Eventos del buscador */

    if (buscador) {

        buscador.addEventListener(
            "input",
            filtrarLaboratorios
        );

    }


    /* Eventos de los filtros */

    if (filtroSistema) {

        filtroSistema.addEventListener(
            "change",
            filtrarLaboratorios
        );

    }


    if (filtroRam) {

        filtroRam.addEventListener(
            "change",
            filtrarLaboratorios
        );

    }


    /* Botón limpiar filtros */

    if (limpiarFiltros) {

        limpiarFiltros.addEventListener(
            "click",
            function () {

                if (buscador) {
                    buscador.value = "";
                }

                if (filtroSistema) {
                    filtroSistema.value = "todos";
                }

                if (filtroRam) {
                    filtroRam.value = "todos";
                }

                filtrarLaboratorios();

            }
        );

    }


    /* Ejecutar una vez al cargar */

    if (laboratorios.length > 0) {
        filtrarLaboratorios();
    }


    /* =====================================================
       GALERÍA DE FOTOGRAFÍAS
       ===================================================== */

    const fotosGaleria =
        document.querySelectorAll(
            ".foto-galeria"
        );

    const galeriaModal =
        document.getElementById("galeriaModal");

    const cerrarGaleria =
        document.getElementById("cerrarGaleria");

    const imagenGaleria =
        document.getElementById("imagenGaleria");

    const contadorGaleria =
        document.getElementById("contadorGaleria");

    const fotoAnterior =
        document.getElementById("fotoAnterior");

    const fotoSiguiente =
        document.getElementById("fotoSiguiente");


    let fotosActuales = [];

    let indiceActual = 0;


    /* =====================================================
       ABRIR GALERÍA
       ===================================================== */

    function abrirGaleria(laboratorio) {

        fotosActuales =
            Array.from(fotosGaleria)
                .filter(function (foto) {

                    return foto.dataset.laboratorio ===
                        laboratorio;

                });


        if (fotosActuales.length === 0) {
            return;
        }


        indiceActual = 0;

        mostrarFoto();


        if (galeriaModal) {

            galeriaModal.classList.add("abierto");

            galeriaModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow = "hidden";

        }

    }


    /* =====================================================
       MOSTRAR FOTO
       ===================================================== */

    function mostrarFoto() {

        if (
            !imagenGaleria ||
            !contadorGaleria ||
            fotosActuales.length === 0
        ) {
            return;
        }


        const foto =
            fotosActuales[indiceActual];


        imagenGaleria.src =
            foto.src;

        imagenGaleria.alt =
            foto.alt;


        contadorGaleria.textContent =
            (indiceActual + 1) +
            " / " +
            fotosActuales.length;

    }


    /* =====================================================
       SIGUIENTE FOTO
       ===================================================== */

    function siguienteFoto() {

        if (fotosActuales.length === 0) {
            return;
        }

        indiceActual++;

        if (
            indiceActual >=
            fotosActuales.length
        ) {
            indiceActual = 0;
        }

        mostrarFoto();

    }


    /* =====================================================
       FOTO ANTERIOR
       ===================================================== */

    function anteriorFoto() {

        if (fotosActuales.length === 0) {
            return;
        }

        indiceActual--;

        if (indiceActual < 0) {

            indiceActual =
                fotosActuales.length - 1;

        }

        mostrarFoto();

    }


    /* =====================================================
       CERRAR GALERÍA
       ===================================================== */

    function cerrarGaleriaFuncion() {

        if (!galeriaModal) {
            return;
        }

        galeriaModal.classList.remove("abierto");

        galeriaModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    /* =====================================================
       EVENTOS DE LAS FOTOS
       ===================================================== */

    fotosGaleria.forEach(function (foto) {

        foto.addEventListener(
            "click",
            function () {

                const laboratorio =
                    foto.dataset.laboratorio;

                abrirGaleria(laboratorio);

            }
        );

    });


    /* =====================================================
       EVENTOS DE LOS BOTONES
       ===================================================== */

    if (fotoSiguiente) {

        fotoSiguiente.addEventListener(
            "click",
            siguienteFoto
        );

    }


    if (fotoAnterior) {

        fotoAnterior.addEventListener(
            "click",
            anteriorFoto
        );

    }


    if (cerrarGaleria) {

        cerrarGaleria.addEventListener(
            "click",
            cerrarGaleriaFuncion
        );

    }


    /* =====================================================
       CERRAR AL HACER CLICK FUERA DE LA IMAGEN
       ===================================================== */

    if (galeriaModal) {

        galeriaModal.addEventListener(
            "click",
            function (evento) {

                if (
                    evento.target ===
                    galeriaModal
                ) {

                    cerrarGaleriaFuncion();

                }

            }
        );

    }


    /* =====================================================
       TECLADO
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                !galeriaModal ||
                !galeriaModal.classList.contains(
                    "abierto"
                )
            ) {
                return;
            }


            if (evento.key === "Escape") {

                cerrarGaleriaFuncion();

            }


            if (evento.key === "ArrowRight") {

                siguienteFoto();

            }


            if (evento.key === "ArrowLeft") {

                anteriorFoto();

            }

        }
    );

});