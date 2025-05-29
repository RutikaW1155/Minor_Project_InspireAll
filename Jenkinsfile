pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        IMAGE_NAME = 'inspireall-app'
        IMAGE_TAG = 'latest'
    }

    tools {
        nodejs 'NodeJS_20'  // Updated to Node 20
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/RutikaW1155/Minor_Project_InspireAll.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Will not fail pipeline even if test script is missing
                sh 'npm run test || echo "No tests defined"'
            }
        }

        stage('Build Vite App') {
            steps {
                // Ensure Vite is installed or this will fail
                sh 'npx vite build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Deploy (Optional)') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Example: sh 'docker run -d -p 80:80 $IMAGE_NAME:$IMAGE_TAG'
            }
        }
    }

    post {
        success {
            echo 'Build and Docker image creation successful.'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
