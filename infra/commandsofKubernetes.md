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
6. More Commands:
    6.1. kubectl get namespaces
    6.2. kubectl get services -n namespace_id
    Note: the url for calling api is: 
        Definition: http://namespace_of_service.namespace.svc.cluster.local/
        Example:    http://ingress-nginx-controller.svc.cluster.local
    


CREATING CONFIG "STATEMENTS" LITERAL POD

1. kubectl create secret generic pod_config_name --from-literal=pod_config_key=example_secret_key

# Port Forward
kubectl port-forward nats_pod_id port_source:port_target

NATS Streaming Server:

Option 1:
Publisher Program -> [Ingress-Nginx <--> NATS ClusterIP Service <--> NATS Pod]

Option 2:
Publisher program -> [NodePort Service <--> NATS Pod]

Option 3:
Publisher program -> [Port Forward Port 4222 <--> NATS Pod]

kubectl port-forward nats_pod_id port_source:port_target

# For monitoring fo to: localhost:8222, for more info explore over links