pipeline {
    agent any

    environment {
        registry = "noor2323/myproj"
        registryCredential = "docker_hub"
        dockerImage = "myproj"
    }

    stages {
        stage('Build and Push Image') {
            steps {
                script {
                    dockerImage = docker.build("${registry}:${BUILD_NUMBER}")
                    docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                bat "docker rmi ${registry}:${BUILD_NUMBER}"
                bat "everything went well"
            }
        }
        failure {
          script {
            bat "something went wrong!"
          }
        }
        
    }
}
