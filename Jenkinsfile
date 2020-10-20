pipeline {
	agent {
    docker {
      image 'node:14-buster'
      args '-p 3010:3010'
    }
  }

  stages {
    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }
    stage('Test') {
      steps {
        sh 'yarn test'
      }
    }
    stage('Test A11y') {
      steps{
        sh 'yarn test-a11y'
      }
    }
  }
}
