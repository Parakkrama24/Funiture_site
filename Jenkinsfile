pipeline {
    agent any 
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/Parakkrama24/Funiture_site.git'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t parakkrama/funiturefront:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerPassword', variable: 'DOCKER_PASSWORD')]) {
                    bat "docker login -u parakkrama -p ${DOCKER_PASSWORD}"
                }
            }
        }   
      
        stage('Push Image') {
            steps {
                bat 'docker push parakkrama/funiturefront:%BUILD_NUMBER%'
            }
        }
    
        post {
        always {
            bat 'docker logout'
        }
    
        }}}