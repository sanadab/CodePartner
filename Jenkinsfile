pipeline {
    agent any
    environment {
        dockerImage = 'noor2323/myproj:latest'
        git_repo = 'https://github.com/BS-PMC-2024/BS-PMC-2024-Team27/'
        test_path = 'test/'
    }
    stages {

        stage('Run Docker Image') {
            steps {

                    bat "docker --version"
                    bat "docker run -d --name temp_container -v /logs:/app/logs -p 3000:3000 ${dockerImage}"

                
            }
        }

        stage('Install npm Dependencies') {
            steps {
                script {
                    try {
                        dir(test_path) {
                            bat "npm install"
                        }
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        echo "Failed to install npm dependencies: ${e.message}"
                        throw e
                    }
                }
            }
        }

        stage('Run npm Tests') {
            steps {
                script {
                    try {
                        dir(test_path) {
                            // Run npm tests
                            bat "npm test"
                        }
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        echo "Failed to run npm tests: ${e.message}"
                        throw e
                    }
                }
            }
        }
        
    }

    post {
        always{
            script {
                bat "docker kill temp_container"
            }
        }
        success {
            script {
                try {
                    // Cleanup after successful build and tests
                    bat "docker rm temp_container"
                    echo "Everything went well!"
                } catch (Exception e) {
                    echo "Failed to clean up Docker containers/images: ${e.message}"
                    echo "Everything went well but with cleanup issues!"
                }
            }
        }
        failure {
            script {
                echo "Something went wrong!"
            }
        }
    }
}
