docker tag backend1 fittdev/fd:k8s-backend1-1.0.0
docker tag backend2 fittdev/fd:k8s-backend2-1.0.0
docker tag gateway fittdev/fd:k8s-gateway-1.0.0
docker tag frontend fittdev/fd:k8s-frontend-1.0.0

docker push fittdev/fd:k8s-backend1-1.0.0
docker push fittdev/fd:k8s-backend2-1.0.0
docker push fittdev/fd:k8s-gateway-1.0.0
docker push fittdev/fd:k8s-frontend-1.0.0