1. Deploy Ingress Controller
  `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml`
2. Setup Ingress Controller: Create a file called `ingress.yaml`
  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: frontend-ingress
  spec:
    ingressClassName: nginx
    rules:
      - host: fitdev.com
        http:
          paths:
            - path: /
              pathType: Prefix
              backend:
                service:
                  name: frontend-service
                  port:
                    number: 80
            - path: /api/
              pathType: Prefix
              backend:
                service:
                  name: gateway-service
                  port:
                    number: 8080
            - path: /bypass-gw
              pathType: Prefix
              backend:
                service:
                  name: backend1-service
                  port:
                    number: 3000
  ```
3. Setup Frontend Configuration: Create a file called `frontend.yaml`
  ```yaml
  # Deployment
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: frontend-deployment
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: frontend
    template:
      metadata:
        labels:
          app: frontend
      spec:
        containers:
          - name: frontend
            image: fittdev/fd:k8s-frontend-1.0.0
            ports:
              - containerPort: 80
  ---
  # Service
  apiVersion: v1
  kind: Service
  metadata:
    name: frontend-service
  spec:
    type: ClusterIP
    selector:
      app: frontend
    ports:
      - protocol: TCP
        port: 80
        targetPort: 80
  ```
4. API Gateway Configuration: Create a file called `gateway.yaml`
  ```yaml
  # Deployment
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: gateway-deployment
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: gateway
    template:
      metadata:
        labels:
          app: gateway
      spec:
        containers:
          - name: gateway
            image: fittdev/fd:k8s-gateway-1.0.0
            ports:
              - containerPort: 8080
  ---
  # Service
  apiVersion: v1
  kind: Service
  metadata:
    name: gateway-service
  spec:
    selector:
      app: gateway
    ports:
      - protocol: TCP
        port: 8080
        targetPort: 8080
  ```
5. Backend One Configuration: Create a file called `backend1.yaml`
  ```yaml
  # Deployment
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: backend1-deployment
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: backend1
    template:
      metadata:
        labels:
          app: backend1
      spec:
        containers:
          - name: backend1
            image: fittdev/fd:k8s-backend1-1.0.0
            ports:
              - containerPort: 3000
  ---
  # Service
  apiVersion: v1
  kind: Service
  metadata:
    name: backend1-service
  spec:
    selector:
      app: backend1
    ports:
      - protocol: TCP
        port: 3000
        targetPort: 3000
  ```
6. Backend Two Configuration: Create a file called `backend2.yaml`
  ```yaml
  # Deployment
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: backend2-deployment
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: backend2
    template:
      metadata:
        labels:
          app: backend2
      spec:
        containers:
          - name: backend2
            image: fittdev/fd:k8s-backend2-1.0.0
            ports:
              - containerPort: 3001
  ---
  # Service
  apiVersion: v1
  kind: Service
  metadata:
    name: backend2-service
  spec:
    selector:
      app: backend2
    ports:
      - protocol: TCP
        port: 3001
        targetPort: 3001
  ```
  