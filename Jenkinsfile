pipeline {
    agent any
     environment {
        PATH = "/usr/local/bin:$PATH"
    }
    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    
                    docker.withRegistry('https://hub.docker.com/', 'dockerhub-cred') {

                        def  shoppie-frontendservice =  docker.build('avash9857/shoppie-frontendservice', './frontend')

                        shoppie-frontendservice.push()
                      
                        def  shoppie-appservice =  docker.build('avash9857/shoppie-appservice', './backend')
                         shoppie-appservice.push()
                    }
                    
                }
            }
        }
       
    }
}

