Commads for Skaffold:

First we have to create a file called `skaffoldFileName.yaml`
Example:
------------------------------------------
apiVersion: skaffold/v2alpha3
kind: Config
deploy:
  kubectl:
    manifests: 
      - ./infra/k8s/*
build:
  local:
    push: false
  artifacts:
    - image: vegimik/client
      context: client
      docker:
        dockerfile: Dockerfile
      sync: 
        manual:
          - src: 'src/**/*.js'
            dest: .

------------------------------------------

CMDs:
1. skaffold dev