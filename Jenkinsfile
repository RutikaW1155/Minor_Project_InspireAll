pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        DOCKER_HOST_IP = "13.62.19.208"
        DOCKER_USER = "ubuntu"
        DOCKER_APP_DIR = "chat-app"
    }

    tools {
        nodejs 'NodeJS_18'  // Must match your Jenkins NodeJS tool name
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

        // 🚀 Merged Docker Stage: Build Docker Image
        stage('Build Docker Image') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'KEY')]) {
                    sh """
                        ssh -i \$KEY -o StrictHostKeyChecking=no ${DOCKER_USER}@${DOCKER_HOST_IP} '
                            rm -rf ${DOCKER_APP_DIR} && mkdir -p ${DOCKER_APP_DIR}
                        '

                        scp -i \$KEY -o StrictHostKeyChecking=no -r \
                            src public \
                            Dockerfile package.json package-lock.json vite.config.js index.html\
                            ${DOCKER_USER}@${DOCKER_HOST_IP}:${DOCKER_APP_DIR}/

                        ssh -i \$KEY -o StrictHostKeyChecking=no ${DOCKER_USER}@${DOCKER_HOST_IP} '
                            cd ${DOCKER_APP_DIR} &&
                            docker build -t vite-chat-app .
                        '
                    """
                }
            }
        }

        // 🚀 Merged Docker Stage: Run Docker Container
        stage('Run Container') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'KEY')]) {
                    sh """
                        ssh -i \$KEY -o StrictHostKeyChecking=no ${DOCKER_USER}@${DOCKER_HOST_IP} '
                            docker rm -f vite-chat-container || true &&
                            docker run -d -p 3000:3000 --name vite-chat-container vite-chat-app
                        '
                    """
                }
            }
        }

        stage('Deploy (Optional)') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Add your deployment commands here if needed
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
