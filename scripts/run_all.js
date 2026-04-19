const { spawn } = require('child_process');
const path = require('path');

const services = [
  { name: 'Frontend', cwd: '.', command: 'npm', args: ['run', 'dev'] },
  { name: 'Auth', cwd: 'backend/services/auth_service', command: 'python', args: ['main.py'] },
  { name: 'Earnings', cwd: 'backend/services/earnings_service', command: 'python', args: ['main.py'] },
  { name: 'Anomaly', cwd: 'backend/services/anomaly_service', command: 'python', args: ['main.py'] },
  { name: 'Grievance', cwd: 'backend/services/grievance_service', command: 'npm', args: ['start'] },
  { name: 'Analytics', cwd: 'backend/services/analytics_service', command: 'python', args: ['main.py'] },
  { name: 'Certificate', cwd: 'backend/services/certificate_renderer', command: 'node', args: ['index.js'] },
];

console.log('🚀 Starting all FairGig services...\n');

services.forEach((service) => {
  const proc = spawn(service.command, service.args, {
    cwd: path.join(__dirname, '..', service.cwd),
    shell: true,
  });

  proc.stdout.on('data', (data) => {
    console.log(`[${service.name}] ${data.toString().trim()}`);
  });

  proc.stderr.on('data', (data) => {
    console.error(`[${service.name} ERROR] ${data.toString().trim()}`);
  });

  proc.on('close', (code) => {
    console.log(`[${service.name}] exited with code ${code}`);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all services...');
  process.exit();
});
