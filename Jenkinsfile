pipeline {
    agent any

    environment {
        registry = "noor2323/myproj"
        registryCredential = "docker_hub"
        dockerImage = "myproj"
        git_repo='https://github.com/BS-PMC-2024/BS-PMC-2024-Team27/'
        test_path='test/'
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
        stage('run the docker Image') {
            steps {
                script {
                    bat "docker run --name temp_container -v /logs:/app/logs -p 3000:3000 $dockerImage"
                }
            }
        }
        stage('install npm') {
            steps {
                bat "npm install"
            }
        }
        stage('unitest the code') {
            steps {
                bat "npm test"
            }
        }
    }

    post {
        success {
            script {
                bat "docker rm temp_container"
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
