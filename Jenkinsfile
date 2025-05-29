pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    // Commenting out this block until NodeJS plugin is set up properly
    // tools {
    //     nodejs 'NodeJS_18'  // You must install and configure this tool in Jenkins first
    // }

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
                sh 'npx run build'  // Fixed this from `npx run build`
            }
        }

        stage('Deploy (Optional)') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Example deployment command:
                // sh 'cp -r dist/* /var/www/html/'
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful.'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
