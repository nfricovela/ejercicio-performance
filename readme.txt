PROYECTO: PRUEBA DE RENDIMIENTO - LOGIN FAKESTORE API

DESCRIPCION
Este proyecto contiene un script de pruebas de carga desarrollado con k6.
El objetivo es evaluar el servicio de autenticacion de FakeStore API.

Endpoint:
POST https://fakestoreapi.com/auth/login

TECNOLOGIAS Y VERSIONES
- Sistema operativo: Windows 11
- k6: 2.3.0
- Lenguaje: JavaScript
- Terminal: PowerShell
- Datos de entrada: CSV

ESTRUCTURA DEL PROYECTO
- scripts/: scripts de prueba.
- data/: archivos CSV con credenciales.
- reportes/: resultados de las ejecuciones.
- evidencias/: evidencias complementarias.

REQUISITOS PREVIOS
- Tener k6 instalado.
- Tener conexion a Internet.
- Abrir PowerShell en la carpeta raiz del proyecto.

CONFIGURACION DEL ESCENARIO
- Tipo: constant-arrival-rate.
- Tasa configurada: 21 iteraciones por segundo.
- Duracion: 1 minuto.
- Usuarios virtuales preasignados: 25.
- Maximo de usuarios virtuales: 50.

EJECUCION
Desde la carpeta raiz del proyecto, ejecutar:
k6 run --summary-export ".\reportes\resumen-prueba-final.json" ".\scripts\login-load-test.js"

El script utiliza el archivo data/usuarios-validos.csv.

CRITERIOS DE ACEPTACION
- Minimo 20 solicitudes por segundo.
- Tiempo de respuesta maximo: 1.5 segundos.
- Tasa de errores inferior al 3%.

RESULTADOS DE LA EJECUCION FINAL
- Solicitudes completadas: 1261.
- Rendimiento real: 20.87 solicitudes por segundo.
- Tiempo promedio: 388.92 ms.
- Tiempo maximo: 1.31 segundos.
- Percentil 95: 448.42 ms.
- Errores HTTP: 0%.
- Fallos funcionales de login: 0%.
- Iteraciones descartadas: 0.

RESULTADO: CUMPLE LOS CRITERIOS DE ACEPTACION.

ARCHIVOS DE RESULTADOS
- reportes/resumen-prueba-final.json
- reportes/textSummary.txt

NOTA
Las credenciales se parametrizan desde archivos CSV.
No se deben publicar tokens de autenticacion ni datos sensibles.
