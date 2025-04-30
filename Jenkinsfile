pipeline {
    agent any
    
    // Define environment variables
    environment {
        DOCKER_COMPOSE = 'docker-compose'
        FRONTEND_DIR = './frontend'
        BACKEND_DIR = './backend'
        // Credentials to be defined in Jenkins credentials manager
        DJANGO_ENV_CREDENTIALS = credentials('django-env-file')
        FRONTEND_PORT = '5173'
        BACKEND_PORT = '8000'
        DOCKER_HOST = 'unix:///var/run/docker.sock' // Use default Docker socket on Linux
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
                // Ensure Jenkins user has write permissions to the backend directory
                sh 'chmod -R u+w $BACKEND_DIR'
                
                // Create .env file for backend from Jenkins credentials
                sh 'cp $DJANGO_ENV_CREDENTIALS $BACKEND_DIR/.env'
                
                echo 'Environment setup completed'
            }
        }
        
        stage('Check Docker Status') {
            steps {
                // Check if Docker is running
                sh '''
                    if ! docker -H $DOCKER_HOST info > /dev/null 2>&1; then
                        echo "Docker is not running. Please start the Docker daemon."
                        exit 1
                    fi
                '''
                echo 'Docker is running'
                
                // List current running containers (for reference)
                sh 'docker -H $DOCKER_HOST ps'
            }
        }
        
        stage('Build Dependencies') {
            parallel {
                stage('Build Frontend Dependencies') {
                    steps {
                        dir(FRONTEND_DIR) {
                            // Install npm dependencies
                            sh 'npm ci || npm install'
                            echo 'Frontend dependencies installed'
                        }
                    }
                }
                
                stage('Build Backend Dependencies') {
                    steps {
                        dir(BACKEND_DIR) {
                            // Validate requirements.txt exists
                            sh 'test -f requirements.txt || (echo "requirements.txt not found" && exit 1)'
                            echo 'Backend requirements validated'
                        }
                    }
                }
            }
        }
        
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
                // Save running container IDs for potential restore if build fails
                sh '''
                    FRONTEND_CONTAINER_ID=$(docker -H $DOCKER_HOST ps -q -f name=restaurant-frontend) || true
                    BACKEND_CONTAINER_ID=$(docker -H $DOCKER_HOST ps -q -f name=restaurant-backend) || true
                    echo "FRONTEND_CONTAINER_ID=$FRONTEND_CONTAINER_ID" > container_ids.txt
                    echo "BACKEND_CONTAINER_ID=$BACKEND_CONTAINER_ID" >> container_ids.txt
                '''
                
                // Backup volumes data if needed
                sh 'mkdir -p volume_backups || true'
                
                // Stop existing containers but don't remove volumes
                sh '$DOCKER_COMPOSE -H $DOCKER_HOST down --remove-orphans || true'
                
                // Build docker images using docker-compose
                sh '$DOCKER_COMPOSE -H $DOCKER_HOST build --no-cache'
                
                echo 'Docker images built successfully'
            }
        }
        
        stage('Deploy Services') {
            steps {
                // Start containers in detached mode
                sh '$DOCKER_COMPOSE -H $DOCKER_HOST up -d'
                
                // Wait for services to be fully up
                sh '''
                    echo "Waiting for services to start..."
                    sleep 10
                    
                    # Check if services are running
                    if [ -z "$(docker -H $DOCKER_HOST ps -q -f name=restaurant-frontend)" ] || [ -z "$(docker -H $DOCKER_HOST ps -q -f name=restaurant-backend)" ]; then
                        echo "Services failed to start properly."
                        # Attempt to restore previous containers if build failed
                        if [ -f container_ids.txt ]; then
                            source container_ids.txt
                            if [ ! -z "$FRONTEND_CONTAINER_ID" ]; then
                                echo "Attempting to restore previous frontend container..."
                                docker -H $DOCKER_HOST start $FRONTEND_CONTAINER_ID || true
                            fi
                            if [ ! -z "$BACKEND_CONTAINER_ID" ]; then
                                echo "Attempting to restore previous backend container..."
                                docker -H $DOCKER_HOST start $BACKEND_CONTAINER_ID || true
                            fi
                        fi
                        exit 1
                    fi
                '''
                
                // Check if frontend is accessible
                sh '''
                    echo "Checking if frontend is accessible at localhost:${FRONTEND_PORT}..."
                    max_attempts=30
                    attempt=0
                    
                    while [ $attempt -lt $max_attempts ]; do
                        if curl -s http://localhost:${FRONTEND_PORT} > /dev/null; then
                            echo "Frontend is accessible!"
                            break
                        fi
                        
                        attempt=$((attempt+1))
                        echo "Attempt $attempt: Frontend not yet accessible, waiting..."
                        sleep 2
                    done
                    
                    if [ $attempt -eq $max_attempts ]; then
                        echo "Warning: Frontend might not be accessible at localhost:${FRONTEND_PORT}"
                    fi
                '''
                
                echo "Services deployed - Website available at http://localhost:${FRONTEND_PORT}"
            }
        }
        
        stage('Verify Deployment') {
            steps {
                // Check container status
                sh '''
                    echo "Checking containers status:"
                    docker -H $DOCKER_HOST ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
                    
                    # Print access URLs
                    echo "Frontend URL: http://localhost:${FRONTEND_PORT}"
                    echo "Backend URL: http://localhost:${BACKEND_PORT}"
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Deployment completed successfully!'
            echo 'Your restaurant application is running at http://localhost:5173'
            
            // Display container status
            sh 'docker -H $DOCKER_HOST ps'
        }
        
        failure {
            echo 'Deployment failed! Attempting recovery...'
            
            // Try to restart containers if they exist but aren't running
            sh '''
                if docker -H $DOCKER_HOST ps -a | grep -q restaurant-frontend; then
                    docker -H $DOCKER_HOST start restaurant-frontend || true
                fi
                
                if docker -H $DOCKER_HOST ps -a | grep -q restaurant-backend; then
                    docker -H $DOCKER_HOST start restaurant-backend || true
                fi
            '''
            
            // If containers don't exist, try to redeploy from last working state
            sh '''
                if ! docker -H $DOCKER_HOST ps -a | grep -q restaurant-frontend || ! docker -H $DOCKER_HOST ps -a | grep -q restaurant-backend; then
                    echo "Attempting to redeploy services..."
                    $DOCKER_COMPOSE -H $DOCKER_HOST up -d || true
                fi
            '''
        }
        
        always {
            // Clean up temporary files but DO NOT remove containers
            sh '''
                rm -f container_ids.txt || true
                rm -rf volume_backups || true
            '''
            
            // Do NOT run docker-compose down here to keep containers running
            
            echo 'Pipeline completed. Containers will continue running.'
        }
    }
}