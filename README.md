## COVID-19 Perú 🇵🇪

Aquí visualizaras los últimos datos reportados por la [Sala Situacional](https://covid19.minsa.gob.pe/sala_situacional.asp) y [Datos Abiertos](https://www.datosabiertos.gob.pe/search/field_topic/covid-19-917?sort_by=changed)

🇵🇪 [Página para visualizar los datos](https://covid-peru.vercel.app/)\n
🇵🇪 [Casos Positivos](https://covid-peru.vercel.app/casos/positivos)\n
🇵🇪 [Casos Fallecidos](https://covid-peru.vercel.app/casos/vacunados)\n
🇵🇪 [Casos Vacunados](https://covid-peru.vercel.app/casos/vacunados)\n

## Datos COVID-19 Perú 🇵🇪

Todos los datos se actualizan diariamente a las 6:00pm automaticamente con Github Actions:
[Todos los datos](https://github.com/Brian-Aguilar/covid-peru/tree/main/data)

Script para que descargue los datos, los convierta a formato JSON y verifique si a aumentado algun dato por fecha para que actualice:
[Script](https://github.com/Brian-Aguilar/covid-peru/tree/main/database)

## Dependias Utilizadas

Dependecias:

```json
"dependencies": {
    "@amcharts/amcharts4": "^4.10.18",
    "@amcharts/amcharts4-geodata": "^4.1.20",
    "next": "10.1.3",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-table": "^7.6.3"
  },
```

[amchars4](https://www.npmjs.com/package/@amcharts/amcharts4): Para visulizar datos.
[amcharts4-geodata](https://www.npmjs.com/package/@amcharts/amcharts4-geodata): Para visualizar mapa.
[next](https://nextjs.org/): Framework que hace server-rendering(front-end: React y Back-end: express) .
[react](https://reactjs.org/): Libreria Front-end de javascript.
[react-table](https://react-table.tanstack.com/): Visualizador de datos en tablas.

Dependencias de desarrollo:

```json
"devDependencies": {
    "download": "8.0.0",
    "node-fetch": "2.6.1",
    "papaparse": "5.3.0",
    "xlsx": "0.16.9"
  }
```

[download](https://www.npmjs.com/package/download): Para descargar archivos.
[node-fetch](https://www.npmjs.com/package/node-fetch): Peticiones http en el servidor y cliente.
[papaparse](https://www.npmjs.com/package/papaparse): Lee y escribe archivos .csv.
[xlsx](https://www.npmjs.com/package/xlsx): Lee y escribe archivos .xlsx.

## Deploy

Utilize la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) para subir este proyecto.

[Next.js deployment documentation](https://nextjs.org/docs/deployment)
