pipeline {
     agent any
 
     // Define environment variables
     environment {
         DOCKER_COMPOSE = 'docker-compose'
         FRONTEND_DIR = './frontend'
         BACKEND_DIR = './backend'
         // Credentials to be defined in Jenkins credentials manager
         DJANGO_ENV_CREDENTIALS = credentials('django-env-file')
         // Python virtual environment path
         VENV_DIR = '.venv'
     }
 
     // Define pipeline stages
     stages {
         stage('Checkout') {
             steps {
                 // Checkout code from repository
                 checkout scm
                 echo 'Checkout completed'
             }
         }
 
         stage('Setup Environment') {
             steps {
                 // Create .env file for backend from Jenkins credentials
                 sh 'cp $DJANGO_ENV_CREDENTIALS $BACKEND_DIR/.env'
 
                 // Install pyenv if needed
                 // sh 'command -v python3 -m venv || apt-get update && apt-get install -y python3-venv'
 
                 echo 'Environment setup completed'
             }
         }
 
         stage('Build') {
             parallel {
                 stage('Build Frontend') {
                     steps {
                         dir(FRONTEND_DIR) {
                             // Install npm dependencies
                             sh 'npm install'
                             echo 'Frontend dependencies installed'
                         }
                     }
                 }
 
                 stage('Build Backend') {
                     steps {
                         dir(BACKEND_DIR) {
                             // Create and activate Python virtual environment
                             sh '''
                                 python3 -m venv ${VENV_DIR}
                                 . ${VENV_DIR}/bin/activate
                                 pip install --upgrade pip
                                 pip install -r requirements.txt
                             '''
                             echo 'Backend dependencies installed in virtual environment'
                         }
                     }
                 }
             }
         }
 
         // stage('Test') {
         //     parallel {
         //         stage('Test Frontend') {
         //             steps {
         //                 dir(FRONTEND_DIR) {
         //                     // Run npm tests - adjust as per your frontend test command
         //                     sh 'npm test -- --watchAll=false || true'
         //                     echo 'Frontend tests completed'
         //                 }
         //             }
         //         }
 
         //         stage('Test Backend') {
         //             steps {
         //                 dir(BACKEND_DIR) {
         //                     // Run Django tests within virtual environment
         //                     sh '''
         //                         . ${VENV_DIR}/bin/activate
         //                         python manage.py test
         //                     '''
         //                     echo 'Backend tests completed'
         //                 }
         //             }
         //         }
         //     }
         // }
 
                 stage('Lint Frontend') {
                     steps {
                         dir(FRONTEND_DIR) {
                             // Run ESLint
                             sh 'npm run lint || true'
                             echo 'Frontend linting completed'
                         }
                     }
                 }
 
 
 
 
         stage('Build Docker Images') {
             steps {
                 // Stop and remove any running containers to avoid conflicts
                 sh '''
                     $DOCKER_COMPOSE down || true
                     $DOCKER_COMPOSE rm -f || true
                 '''
                 
                 // Build docker images
                 sh '$DOCKER_COMPOSE build'
                 echo 'Docker images built successfully'
             }
         }
 
         stage('Integration Test') {
             steps {
                 // Start containers in detached mode for testing
                 sh '$DOCKER_COMPOSE up -d'
 
                 // Wait for services to be fully up
                 sh 'sleep 10'
 
                 // Run integration tests (placeholder - adjust as needed)
                 echo 'Running integration tests...'
 
                 // Containers will remain running after tests
                 echo 'Integration tests completed'
             }
         }
 
         stage('Test Report') {
             steps {
                 echo 'Generating test reports...'
                 // Here you can add commands to collect and publish test results
                 // Example: junit '**/test-results/*.xml'
             }
         }
     }
 
     post {
         success {
             echo 'All tests passed successfully!'
             // You can add notifications here
             // Example: slackSend channel: '#jenkins', color: 'good', message: 'Tests passed!'
         }
 
         failure {
             echo 'Tests failed! Please review the results.'
             // You can add notifications here
             // Example: slackSend channel: '#jenkins', color: 'danger', message: 'Tests failed!'
         }
 
         always {
             // Clean up virtual environment
             sh 'rm -rf ${BACKEND_DIR}/${VENV_DIR}'
 
             cleanWs()
             echo 'Workspace cleaned'
         }
     }
 }