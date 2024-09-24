module.exports = {
  apps: [
    {
      name: "new-react-app",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
    },
  ],
};
