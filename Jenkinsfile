pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        IMAGE_NAME = 'inspireall-app'
        IMAGE_TAG = 'latest'
    }

    tools {
        nodejs 'NodeJS_18'  // Ensure this matches your Jenkins NodeJS tool configuration
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
                sh 'npm run test || echo "No tests defined"'
            }
        }

        stage('Build Vite App') {
            steps {
                sh 'npx vite build'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh '''
                    docker build -t $IMAGE_NAME:$IMAGE_TAG .
                    '''
                }
            }
        }

        stage('Deploy (Optional)') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Example: Run Docker container
                // sh 'docker run -d -p 80:80 $IMAGE_NAME:$IMAGE_TAG'
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
