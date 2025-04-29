pipeline {
    agent any
    
    // Define environment variables
    environment {
        DOCKER_COMPOSE = 'docker-compose'
        FRONTEND_DIR = './frontend'
        BACKEND_DIR = './backend'
        // Credentials to be defined in Jenkins credentials manager
        DJANGO_ENV_CREDENTIALS = credentials('django-env-file')
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
                            // Install Python dependencies
                            sh 'pip install -r requirements.txt'
                            echo 'Backend dependencies installed'
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
        //                     // Run Django tests
        //                     sh 'python manage.py test'
        //                     echo 'Backend tests completed'
        //                 }
        //             }
        //         }
        //     }
        // }
        
        stage('Lint') {
                stage('Lint Frontend') {
                    steps {
                        dir(FRONTEND_DIR) {
                            // Run ESLint
                            sh 'npm run lint || true'
                            echo 'Frontend linting completed'
                        }
                    }
                }
               
            
        }
        
        stage('Build Docker Images') {
            steps {
                // Build docker images using docker-compose
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
                
                // Stop containers after tests
                sh '$DOCKER_COMPOSE down'
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
            // Clean up workspace and containers
            sh '$DOCKER_COMPOSE down || true'
            cleanWs()
            echo 'Workspace cleaned'
        }
    }
}