const express = require('express');
const app = express();
const sql = require('mssql');

const config = {
  user: 'sa',
  password: '',
  server: 'DESKTOP-RUE53VT',
  database: 'Urunler',
};

app.get('/api/products', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Urunler');
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Veri tabanına erişim hatası' });
  } finally {
    sql.close();
  }
});

app.listen(3001, () => {
  console.log('Sunucu 3001 portunda çalışıyor');
});
