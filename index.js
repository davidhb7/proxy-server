const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Ruta raíz para evitar error 404 al ingresar directamente
app.get('/', (req, res) => {
  res.send('Servidor proxy activo 🚀');
});

// Proxy para GET (consulta)
app.get('/proxy', async (req, res) => {
  const { cedula } = req.query;
  try {
    const response = await axios.get('https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/assesmentDEV', {
      headers: {
        Authorization: 'Token 790cfdfb568c8ca697c72f52d8fab5af63ede025'
      },
      params: { cedula }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error en el proxy GET:', error.message);
    res.status(500).json({ error: 'Error desde el proxy en GET', detalle: error.message });
  }
});

// Proxy para POST (registro)
app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post('https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/assesmentDEV', req.body, {
      headers: {
        Authorization: 'Token 790cfdfb568c8ca697c72f52d8fab5af63ede025'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error en el proxy POST:', error.message);
    res.status(500).json({ error: 'Error desde el proxy en POST', detalle: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy corriendo en el puerto ${PORT}`);
});
