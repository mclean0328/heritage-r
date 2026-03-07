module.exports = {
  apps: [{
    name: 'heritage-r',
    script: 'server/index.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      DB_PATH: '/data/restomod.db'
    },
    instances: 1,
    autorestart: true,
    max_memory_restart: '256M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: '/var/log/heritage-r/error.log',
    out_file: '/var/log/heritage-r/out.log',
  }]
};
