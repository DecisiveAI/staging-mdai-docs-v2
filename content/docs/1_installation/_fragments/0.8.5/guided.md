
---
title: "Install (Guided) - 0.8.5"
type: frags
url: "/_fragments/0.8.5/install_guided"
_build:
  list: never
  render: always
---

## Prerequisites

1. A k8s cluster with `cert-manager` installed.

## Steps

### Install `mdai`

Use Helm to install all `mdai` dependencies into your cluster.

```
helm upgrade --install mdai-hub oci://ghcr.io/decisiveai/mdai-hub \
    --namespace mdai \
    --create-namespace \
    --version 0.8.5 \
    --set mdai-operator.manager.env.otelSdkDisabled=true \
    --set mdai-gateway.otelSdkDisabled=true \
    --set mdai-s3-logs-reader.enabled=false \
    --cleanup-on-fail
```

### Verify install

Verify that the cluster's pods are running.

```
kubectl get pods -n mdai
```

If the cluster is running, you'll see output similar to the following.

```
NAME                                                READY   STATUS    RESTARTS        AGE
alertmanager-kube-prometheus-stack-alertmanager-0   2/2     Running   0               55s
kube-prometheus-stack-operator-6675ddb4bd-9j4td     1/1     Running   0               56s
mdai-event-hub-6456476666-hlld8                     1/1     Running   8               56s
mdai-gateway-7c4f6dfb84-b4wp7                       1/1     Running   8               56s
mdai-hub-kube-state-metrics-644b9d65d6-5rhws        1/1     Running   0               56s
mdai-hub-nats-0                                     3/3     Running   0               56s
mdai-hub-nats-1                                     3/3     Running   0               56s
mdai-hub-nats-2                                     3/3     Running   0               56s
mdai-hub-nats-box-84bc8c67d5-l58kc                  1/1     Running   0               56s
mdai-hub-prometheus-node-exporter-vw6lw             1/1     Running   0               56s
mdai-hub-valkey-primary-0                           1/1     Running   0               56s
mdai-operator-controller-manager-6d5655b85-plgfx    1/1     Running   0               56s
opentelemetry-operator-6d8ddbdc4d-zt5m7             1/1     Running   0               56s
prometheus-kube-prometheus-stack-prometheus-0       2/2     Running   0               55s
```
