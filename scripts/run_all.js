const { spawn } = require('child_process');
const path = require('path');

const fs = require('fs');

// Simple .env parser to inject backend variables into services
const envPath = path.join(__dirname, '..', 'backend', '.env');
const envVars = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      envVars[match[1]] = value;
    }
  });
}
console.log('Loaded env vars:', Object.keys(envVars));

const services = [
  { name: 'Frontend', cwd: '.', command: 'npm', args: ['run', 'dev'] },
  { name: 'Auth', cwd: 'backend/services/auth_service', command: 'python', args: ['main.py'] },
  { name: 'Earnings', cwd: 'backend/services/earnings_service', command: 'python', args: ['main.py'] },
  { name: 'Anomaly', cwd: 'backend/services/anomaly_service', command: 'python', args: ['main.py'] },
  { name: 'Grievance', cwd: 'backend/services/grievance_service', command: 'npm', args: ['start'] },
  { name: 'Analytics', cwd: 'backend/services/analytics_service', command: 'python', args: ['main.py'] },
  { name: 'Certificate', cwd: 'backend/services/certificate_renderer', command: 'node', args: ['index.js'] },
];

console.log('🚀 Starting all FairGig services with Supabase connection...\n');

const binPath = path.join(__dirname, '..', 'node_modules', '.bin');
const updatedPath = `${binPath}${path.delimiter}${process.env.PATH}`;

services.forEach((service) => {
  const proc = spawn(service.command, service.args, {
    cwd: path.join(__dirname, '..', service.cwd),
    shell: true,
    env: { ...process.env, ...envVars, PATH: updatedPath }
  });


  proc.stdout.on('data', (data) => {
    console.log(`[${service.name}] ${data.toString().trim()}`);
  });

  proc.stderr.on('data', (data) => {
    console.error(`[${service.name} (Log)] ${data.toString().trim()}`);
  });

  proc.on('close', (code) => {
    console.log(`[${service.name}] exited with code ${code}`);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all services...');
  process.exit();
});
