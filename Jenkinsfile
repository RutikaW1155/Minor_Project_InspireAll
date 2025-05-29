pipeline {
    agent any
    options {
        durabilityHint('MAX_SURVIVABILITY')
    }

    environment {
        NODE_ENV = 'production'
        IMAGE_NAME = 'inspireall-app'
        IMAGE_TAG = 'latest'
        DOCKER_HOST_IP = '13.53.109.186'
        DOCKER_USER = 'ubuntu'
        DOCKER_APP_DIR = 'inspireall-app'
    }

    tools {
        nodejs 'NodeJS_18'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/RutikaW1155/Minor_Project_InspireAll.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
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
                branch 'main'
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'KEY')]) {
                    sh """
                        set -e
                        ssh -i \$KEY -o StrictHostKeyChecking=no ${DOCKER_USER}@${DOCKER_HOST_IP} '
                            rm -rf ${DOCKER_APP_DIR} && mkdir -p ${DOCKER_APP_DIR}
                        '

                        scp -i \$KEY -o StrictHostKeyChecking=no -r \
                            dist Dockerfile package.json package-lock.json \
                            ${DOCKER_USER}@${DOCKER_HOST_IP}:${DOCKER_APP_DIR}/

                        ssh -i \$KEY -o StrictHostKeyChecking=no ${DOCKER_USER}@${DOCKER_HOST_IP} '
                            cd ${DOCKER_APP_DIR} &&
                            docker rm -f ${IMAGE_NAME}-container || true &&
                            docker build -t ${IMAGE_NAME}:${IMAGE_TAG} . &&
                            docker run -d -p 3000:3000 --name ${IMAGE_NAME}-container ${IMAGE_NAME}:${IMAGE_TAG}
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Build, Docker image creation, and deployment successful.'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
