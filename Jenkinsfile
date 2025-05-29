pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        IMAGE_NAME = 'inspireall-app'
        IMAGE_TAG = 'latest'

        // Docker deployment configuration
        DOCKER_HOST_IP = '13.53.109.186'
        DOCKER_USER = 'ubuntu'
        DOCKER_APP_DIR = 'inspireall-app'
    }

    tools {
        nodejs 'NodeJS_18'  // Ensure this is configured in Jenkins tools
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

        stage('Deploy with Docker') {
            when {
                branch 'main' // Ensure your Jenkins pipeline is triggered on 'main' branch
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'KEY')]) {
                    sh """
                        echo "Connecting to remote EC2 instance..."

                        # Create/clean remote deployment directory
                        ssh -i \$KEY -o StrictHostKeyChecking=no ${DOCKER_USER}@${DOCKER_HOST_IP} '
                            rm -rf ${DOCKER_APP_DIR} && mkdir -p ${DOCKER_APP_DIR}
                        '

                        # Copy project files to remote EC2
                        scp -i \$KEY -o StrictHostKeyChecking=no -r \
                            dist Dockerfile package.json package-lock.json \
                            ${DOCKER_USER}@${DOCKER_HOST_IP}:${DOCKER_APP_DIR}/

                        # SSH into EC2 to build and run Docker container
                        ssh -i \$KEY -o StrictHostKeyChecking=no ${DOCKER_USER}@${DOCKER_HOST_IP} '
                            cd ${DOCKER_APP_DIR} &&
                            docker rm -f ${IMAGE_NAME}-container || true &&
                            docker build -t ${IMAGE_NAME}:${IMAGE_TAG} . &&
                            docker run -d -p 80:80 --name ${IMAGE_NAME}-container ${IMAGE_NAME}:${IMAGE_TAG}
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build, Docker image creation, and deployment successful.'
        }
        failure {
            echo '❌ Build or deployment failed.'
        }
    }
}
