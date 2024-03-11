#!/bin/bash

kubectl delete deployment backend1-deployment backend2-deployment frontend-deployment gateway-deployment
kubectl delete service backend1-service backend2-service frontend-service gateway-service
