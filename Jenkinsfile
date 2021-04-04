// // Prevent blue ocean from triggering a build on every branch when importing the repository.
// // The following approach requires extra permissions to be configured on the project
// // in order to use.
// if (currentBuild.rawBuild.getCauses().toString().contains('BranchIndexingCause')) {
//   print "INFO: Build skipped due to trigger being Branch Indexing"
//   currentBuild.result = 'Skipping Index Build'
//   return
// }


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
    // AWS_S3_BUCKET = credentials('jenkins-aws-s3-bucket')
    // AWS_ACCESS_KEY_ID = credentials('jenkins-aws-access-key-id')
    // AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
    // AWS_REGION = 'us-east-1'
  }

  // poll every 5 minutes with a hashing factor to prevent simultaneous execution
  triggers { pollSCM('H/5 * * * *') }

  stages {
    // the following filter assists with preventing a Jenkins Blue Ocean project import from
    // building all branches simultaneously on import.

    stage('1-Build Filter') {
      steps {
        
        script{
          echo ' \r'
          echo '*******************************************************************************\r'
          echo '*             STAGE: Build Filter to control branch execution                 *\r'
          echo '*******************************************************************************\r'
          echo ' \r'
        }
        
        script{
          if (BUILD_NUMBER == '1') {
            echo 'Fist Build...'
            error('Stop')
          } else {
            echo "Skip to steps on branch = ${BRANCH_NAME}"
          }
        }
      }
    }

    stage('2-Install all development dependencies and tools') {
      steps {
        // sh 'npm install yarn'
        // sh './node_modules/.bin/yarn'
        sh 'yarn'
        sh 'npx lerna bootstrap'
      }
    }
    stage('Build the styles project and the react components project') {
      steps {
        sh 'NODE_ENV=production yarn --cwd=packages/styles build'
        sh 'NODE_ENV=production yarn --cwd=packages/react build'
      }
    }
    stage('Run unit tests against the react project') {
      steps {
        sh 'yarn --cwd=packages/react test'
      }
    }
    stage('Test full site using Axe and generate reports') {
      steps {
        sh 'yarn dev &'
        sh 'wait-for-it.sh --timeout=30 localhost:8000 && yarn test-pa11y-axe'
        sh 'yarn generate-pa11y-axe-report'
				sh 'yarn print-pa11y-axe-cli-results'
      }
    }
    stage('Test full site using HTMLCS and generate reports)') {
      steps {
        sh 'yarn dev &'
        sh 'wait-for-it.sh --timeout=30 localhost:8000 && yarn test-pa11y-htmlcs'
        sh 'yarn generate-pa11y-htmlcs-report'
				sh 'yarn print-pa11y-htmlcs-cli-results'
      }
    }

    stage('Build and package the entire site') {
      steps {
        sh 'yarn build'
      }
    }

    stage('Publish the site and reports to S3') {
      steps {
        withAWS(credentials:'aws_kci', region: "us-east-1") {
          s3Upload(file:'docs/dist', bucket:'s3.kci-01', acl:'PublicRead')
        }
      }
    }
  }
}
