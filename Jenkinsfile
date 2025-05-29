pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    tools {
        nodejs 'NodeJS_18'  // Ensure NodeJS 18 is installed in Jenkins tools
    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/Gayatridandgal/Minor_Project_Inspireall.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Skip if no tests are defined
                sh 'npm run test || echo "No tests defined"'
            }
        }

        stage('Build Vite App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy (Optional)') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Replace this with your deployment script
                // For example, copying to Apache/Nginx directory:
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
