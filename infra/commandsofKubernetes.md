Commands for Kubernetes


1. Create Pod for a project:
Code:  `apiVersion: v1
        kind: Pod
        metadata:
            name: posts
        spec:
            containers:
                - name: posts
                  image: vegimik/posts:0.0.1`
CMD:    `kubectl apply -f filename.yaml`

=> If your pods are showing ErrImagePull, ErrImageNeverPull, or ImagePullBackOff errors after running kubectl apply, the simplest solution is to provide an imagePullPolicy to the pod.
CMD :  `kubectl delete -f infra/k8s/`
CODE:  `spec:
            containers:
                - name: posts
                  image: cygnet/posts:0.0.1
                  imagePullPolicy: Never`
THEN CMD: `kubectl apply -f infra/k8s/`

2. Get Pods from Kubernetes
CMD:    `kubectl get pods`

COMMANDS:
1. kubectl get pods
2. kubectl exec -it [pod_name][cmd]
3. kubectl logs [pod_name]
4. kubectl delete pod [pod_name]
5. kubectl apply -f [config file name]
6. kubectl describe pod [pod_name]


NOTES: `fileName_depl.yaml`, `depl` stays for deployment



DEPLOYMENTS COMMANDS

1. kubectl get deployments
2. kubectl describe deployment [depl_name]
3. kubectl apply -f [config file name]
4. kubectl delete deployment [depl_name]
5. kubcetl rollout restart deployment [depl_name]


CREATING CONFIG "STATEMENTS" LITERAL POD

1. kubectl create secret generic pod_config_name --from-literal=pod_config_key=example_secret_key