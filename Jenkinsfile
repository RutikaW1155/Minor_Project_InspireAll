pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    tools {
        nodejs 'NodeJS_18'  // Make sure this matches the name in Jenkins tool config
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/RutikaW1155/Minor_Project_InspireAll.git'
            }
        }

        stage('Verify Node & npm') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests only if test script is defined in package.json
                    def hasTests = sh(script: 'npm run | grep -q "test"', returnStatus: true) == 0
                    if (hasTests) {
                        sh 'npm run test'
                    } else {
                        echo 'No tests defined in package.json.'
                    }
                }
            }
        }

        stage('Build Vite App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production server...'
                // Example placeholder - replace with actual deployment command
                // sh 'cp -r dist/* /var/www/html/'
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful.'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
}
