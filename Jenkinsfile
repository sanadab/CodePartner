pipeline {
  environment {
    registry="noorwa1/my-app"
    registryCredential="docker_hub"
    dockerImage="
    }
  stage('build and push image') {
    steps{
      dockerImage=docker.build registry+":$BUILD_NUMBER"
      docker.withRegistry(",registryCredential){
      dockerImage.push()                    
      }
    }
  }
  post{
    always{
      bat "docker rmi $registry:$BUILD_NUMBER"
    }
  }
    
}
