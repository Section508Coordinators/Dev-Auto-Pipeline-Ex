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

    stage('1-Execute build filter') {
      steps {
        
        script{
          echo ' '
          echo '*******************************************************************************'
          echo '*            STAGE 1: Build Filter to control branch execution                *'
          echo '*******************************************************************************'
          echo ' '
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

    stage('2-Install dependencies and tools') {
      steps {
        // sh 'npm install yarn'
        // sh './node_modules/.bin/yarn'
        
        script{
          echo ' '
          echo '*******************************************************************************'
          echo '*         STAGE 2: Install all development dependencies and tools             *'
          echo '*******************************************************************************'
          echo ' '
        }
             
        sh 'yarn'
        sh 'npx lerna bootstrap'
      }
    }
    stage('3-Build styles and UI Components') {              
      steps {
        
        script{
          echo ' '
          echo '*******************************************************************************'
          echo '*      STAGE 3: Build the styles project and REACT components project         *'
          echo '*******************************************************************************'
          echo ' '
        }                     
        
        sh 'NODE_ENV=production yarn --cwd=packages/styles build'
        sh 'NODE_ENV=production yarn --cwd=packages/react build'
      }
    }
    stage('4-Perform Unit Testing') {      
      steps {
        
        script{
          echo ' '
          echo '***********************************************************************************************'
          echo '* STAGE 4: Execute traditional and accessibility unit tests against UI component code library *'
          echo '***********************************************************************************************'
          echo ' '
        } 
        
        sh 'yarn --cwd=packages/react test'
      }
    }
    stage('5-Axe-core integration testing and reporting') {
      steps {
        sh 'yarn dev &'
        
        script{
          echo ' '
          echo '***********************************************************************************************************'
          echo '*   STAGE 5: Perform accessibility testing on Demo site using Axe-core rules and generate HTML reports    *'
          echo '***********************************************************************************************************'
          echo ' '
        }
        
        sh 'wait-for-it.sh --timeout=30 localhost:8000 && yarn test-pa11y-axe'
        sh 'yarn generate-pa11y-axe-report'
				sh 'yarn print-pa11y-axe-cli-results'
      }
    }
    stage('6-HTMLCS integration testing and reporting') {
      steps {
        
        script{
          echo ' '
          echo '***********************************************************************************************************'
          echo '*    STAGE 6: Perform accessibility testing on Demo site using HTMLCS rules and generate HTML reports     *'
          echo '***********************************************************************************************************'
          echo ' '
        }      
        
        sh 'yarn dev &'
        sh 'wait-for-it.sh --timeout=30 localhost:8000 && yarn test-pa11y-htmlcs'
        sh 'yarn generate-pa11y-htmlcs-report'
				sh 'yarn print-pa11y-htmlcs-cli-results'
      }
    }

    stage('7-Prepare deployment to Staging') {
      steps {
        
        script{
          echo ' '
          echo '***********************************************************************************************************'
          echo '*     STAGE 7: Build and package entire site and reports in preparation for deployment to staging         *'
          echo '***********************************************************************************************************'
          echo ' '
        }
             
        sh 'yarn build'
      }
    }

    stage('8-Publish the site and reports to S3') {
      steps {
        
        script{
          echo ' '
          echo '***********************************************************************************************************'
          echo '*              STAGE 8: Push current code and reporting to AWS Staging (Amazon S3 Object                  *'
          echo '***********************************************************************************************************'
          echo ' '
        }
      
        withAWS(credentials:'aws_kci', region: "us-east-1") {
          s3Upload(file:'docs/dist', bucket:'s3.kci-01', acl:'PublicRead')
        }
      }
    }
  }
}
