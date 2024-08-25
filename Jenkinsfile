pipeline {
    agent any
     environment {
        PATH = "/usr/local/bin:$PATH"
    }
    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-cred') {

                        def  shoppiefrontendservice =  docker.build('avash9857/shoppie-frontendservice', './frontend')

                        shoppiefrontendservice.push()
                      
                        def  shoppieappservice =  docker.build('avash9857/shoppie-appservice', './backend')
                         shoppieappservice.push()
                    }
                    
                }
            }
        }
       
    }
}

