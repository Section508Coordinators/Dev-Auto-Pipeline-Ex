pipeline {
  agent {
    docker {
      image 'buildkite/puppeteer:5.2.1'
      // args '-p 3010:3010'
      // following doesn't work and needs serious adjustments
      // need to figure out a better caching strategy
      // args '-v /srv/puppeteer/.npm:/.npm'
    }
  }
  environment {
    HOME = '.'
  }
  stages {
    stage('Deps') {
      steps {
        // sh 'npm install yarn'
        // sh './node_modules/.bin/yarn'
        sh 'yarn'
        sh 'npx lerna bootstrap'
      }
    }
    stage('Build') {
      steps {
        sh 'NODE_ENV=production yarn --cwd=packages/styles build'
        sh 'NODE_ENV=production yarn --cwd=packages/react build'
      }
    }
    stage('Test') {
      steps {
        sh 'yarn --cwd=packages/react test'
      }
    }
    stage('Test A11y') {
      steps {
        sh 'yarn dev &'
        sh 'wait-for-it.sh --timeout=30 localhost:8000 && yarn test-pa11y'
        sh 'yarn generate-pa11y-report'

      }
    }
    stage('Build All') {
      steps {
        sh 'yarn build'
      }
    }
  }
}
