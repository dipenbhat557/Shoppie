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
           
        stage('Update Kubeconfig') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials-id-jun-jenkin-mah-setup-garekocha']]) {
                        sh 'aws eks --region $AWS_REGION update-kubeconfig --name $EKS_CLUSTER_NAME'
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f ./kubernetes/backend-depo-service.yaml'
                    sh 'kubectl apply -f ./kubernetes/frontend-depo-service.yaml'
                    sh 'kubectl apply -f ./kubernetes/database-depo-service.yaml'
                }
            }
        }
        
       
    }



