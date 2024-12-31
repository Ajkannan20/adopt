module.exports = {
    apps: [
      {
        name: 'FailedBuild',       // Process name
        script: 'FailedBuild.js',  // Script to run
        instances: 1,              // Single instance
        autorestart: true,         // Restart if it crashes
        watch: false,              // Don't watch for file changes
        env: {
          NODE_ENV: 'production',
        },
      },
      {
        name: 'FailedDeployment',  // Process name
        script: 'FailedDeployment.js', // Script to run
        instances: 1,              // Single instance
        autorestart: true,         // Restart if it crashes
        watch: false,              // Don't watch for file changes
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  