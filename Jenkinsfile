pipeline {
    agent any
    

    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    
                    docker.build('avash9857/shoppie-frontendservice', './frontend')
                    
        
                    docker.build('avash9857/shoppie-appservice', './backend')
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
              docker.withRegistry('', 'dockerhub-cred') {
        
                        docker.image('avash9857/shoppie-frontendservice').push('latest')
                        
                        
                        docker.image('avash9857/shoppie-appservice').push('latest')
                    }
                }
            }
        }
    }
}
