pipeline {
  environment {
    registry="noor2323/myproj"
    registryCredential="docker_hub"
    dockerImage="myproj"
    }
  stages{
  stage('build and push image') {
    steps{
      dockerImage=docker.build registry+":$BUILD_NUMBER"
      docker.withRegistry("myproj",registryCredential){
      dockerImage.push()                    
      }
    }
  }
  }
  post{
    always{
      bat "docker rmi $registry:$BUILD_NUMBER"
    }
  }
    
}
