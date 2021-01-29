module.exports = {
  apps : [{
    name: "mockapp",
    script: "./src/index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    watch: ['src', 'conf'],
    // autorestart: false,
    max_restarts: 1,
    min_uptime: 1000,
  }]
}