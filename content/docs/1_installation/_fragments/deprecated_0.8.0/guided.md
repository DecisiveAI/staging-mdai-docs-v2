---
title: "Install (Guided) - 0.8.0"
type: frags
url: "/_fragments/0.8.0/install_guided"
_build:
  list: never
  render: always
---

### Prerequisites

1. A k8s cluster with `cert-manager` installed.

### Install `mdai` into your k8s cluster

Use Helm to install all `mdai` dependencies into your cluster.

    ```
    helm upgrade --install \
      mdai oci://ghcr.io/decisiveai/mdai-hub \
      --namespace mdai \
      --create-namespace \
      --version 0.8.0-rc3 \
      --set mdai-operator.manager.env.otelSdkDisabled=true \
      --set mdai-gateway.otelSdkDisabled=true \
      --set mdai-s3-logs-reader.enabled=false \
      # --- switch RabbitMQ image to official 4.2 RC with management plugin ---
      --set rabbitmq.enabled=true \
      --set rabbitmq.image.registry=docker.io \
      --set rabbitmq.image.repository=rabbitmq \
      --set rabbitmq.image.tag=4.2-rc-management \
      # --- map your secret to the envs the official image uses ---
      --set rabbitmq.auth.username=mdai \
      --set rabbitmq.auth.existingPasswordSecret=rabbitmq-secret \
      --set rabbitmq.auth.existingSecretPasswordKey=RABBITMQ_PASSWORD \
      --set rabbitmq.extraEnvVars[0].name=RABBITMQ_DEFAULT_USER \
      --set rabbitmq.extraEnvVars[0].valueFrom.secretKeyRef.name=rabbitmq-secret \
      --set rabbitmq.extraEnvVars[0].valueFrom.secretKeyRef.key=RABBITMQ_USERNAME \
      --set rabbitmq.extraEnvVars[1].name=RABBITMQ_DEFAULT_PASS \
      --set rabbitmq.extraEnvVars[1].valueFrom.secretKeyRef.name=rabbitmq-secret \
      --set rabbitmq.extraEnvVars[1].valueFrom.secretKeyRef.key=RABBITMQ_PASSWORD \
      # --- align security context with official image (UID/GID 999) ---
      --set rabbitmq.containerSecurityContext.enabled=true \
      --set rabbitmq.containerSecurityContext.runAsUser=999 \
      --set rabbitmq.podSecurityContext.enabled=true \
      --set rabbitmq.podSecurityContext.fsGroup=999 \
      # --- avoid path mismatch for first boot; re-enable later if desired ---
      --set rabbitmq.persistence.enabled=false \
      --cleanup-on-fail >/dev/null 2>&1 || echo "⚠️ mdai: unable to install helm chart"
    ```

1. Verify that the cluster's pods are running.

    ```
    kubectl get pods -n mdai
    ```

If the cluster is running, you'll see output similar to the following.

```
NAME                                                READY   STATUS    RESTARTS     AGE
alertmanager-kube-prometheus-stack-alertmanager-0   2/2     Running   0            50s
kube-prometheus-stack-operator-6cfdc788d4-ts297     1/1     Running   0            59s
mdai-event-hub-556c8897f5-kpn9g                     1/1     Running   0            59s
mdai-gateway-5df8b6f749-qlm88                       1/1     Running   0            59s
mdai-grafana-84bb594f6c-d6shj                       3/3     Running   0            59s
mdai-kube-state-metrics-6cd9fd8458-rhrmr            1/1     Running   0            59s
mdai-operator-controller-manager-65955fb98b-trn26   1/1     Running   0            59s
mdai-prometheus-node-exporter-zm8k7                 1/1     Running   0            59s
mdai-rabbitmq-0                                     1/1     Running   0            59s
mdai-valkey-primary-0                               1/1     Running   0            59s
opentelemetry-operator-6d8ddbdc4d-5rjcl             1/1     Running   0            59s
prometheus-kube-prometheus-stack-prometheus-0       2/2     Running   0            50s
```

### Set Up the MDAI Hub

1. From the root directory of the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs) that you cloned, apply the hub configuration to the hub resource.
   ```
   kubectl apply -f ./mdai/hub/hub_ref.yaml -n mdai
   ```

2. Verify the hub is applied by running

   ```
   kubectl get customresourcedefinitions mdaihubs.hub.mydecisive.ai
   ```

Your output should be similar to the following.
```
NAME                         CREATED AT
mdaihubs.hub.mydecisive.ai   2025-03-24T20:02:19Z
```