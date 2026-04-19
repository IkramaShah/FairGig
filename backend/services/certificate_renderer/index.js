const express = require('express');
const app = express();
const port = 8006;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'certificate-renderer' });
});

app.post('/generate-certificate', (req, res) => {
  const { worker_name, total_income, period } = req.body;
  // This service would normally generate a PDF or HTML template
  // For the competition, it returns the structured data for the printable view
  res.json({
    success: true,
    certificate_id: `FG-${Date.now()}`,
    html_template: `<h1>Income Certificate</h1><p>Worker: ${worker_name}</p><p>Total: ${total_income}</p>`
  });
});

app.listen(port, () => {
  console.log(`Certificate Renderer listening at http://localhost:${port}`);
});
