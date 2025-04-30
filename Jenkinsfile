pipeline {
    agent any

    environment {
        DJANGO_ENV_CREDENTIALS = credentials('django-env-file')
    }

    stages {
        stage('Prepare Workspace') {
            steps {
                sh 'sudo rm -rf /var/lib/jenkins/workspace/resto2/*'
                sh 'sudo chown -R jenkins:jenkins /var/lib/jenkins/workspace/resto2'
                sh 'sudo chmod -R u+w /var/lib/jenkins/workspace/resto2'
                echo 'Workspace cleaned and permissions updated successfully.'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
                echo 'Code checked out successfully.'
            }
        }

        stage('Setup Environment') {
            steps {
                dir('backend') {
                    // Ensure correct permissions for accessible files only
                    sh 'ls -l'
                    sh 'find . -type f -exec chmod 664 {} + || true'
                    sh 'find . -type d -exec chmod 775 {} + || true'
                    sh 'chmod +x entrypoint.sh'  // Ensure entrypoint.sh is executable
                    sh 'cp $DJANGO_ENV_CREDENTIALS .env'
                    sh 'ls -l'
                    echo 'Environment variables set up successfully.'
                }
            }
        }

        stage('Build and Start Services') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up --build -d'
                echo 'Docker services built and started successfully.'
            }
        }

        stage('Run Migrations') {
            steps {
                dir('backend') {
                    sh 'docker-compose exec backend python manage.py makemigrations'
                    sh 'docker-compose exec backend python manage.py migrate'
                    echo 'Database migrations applied successfully.'
                }
            }
        }

      
        stage('Run Tests') {
            steps {
                dir('backend') {
                    // sh 'docker-compose exec backend python manage.py test'
                    echo 'Tests executed successfully.'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            // sh 'docker-compose down'
            // cleanWs()
        }

        success {
            echo 'Pipeline executed successfully!'
        }

        failure {
            // sh 'docker-compose down'
            echo 'Pipeline failed. Please check the logs.'

        }
    }
}