pipeline {
  agent {
    docker {
      image 'node:14-buster'
      args '-p 3010:3010'
    }
  }
  environment {
    HOME = '.'
  }
  stages {
    stage('Deps') {
      steps {
        sh 'npm install --global yarn'
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
        sh 'sleep 20 && yarn test-a11y'
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
