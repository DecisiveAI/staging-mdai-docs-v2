---
title: Installation
weight: 2
---

There are 2 ways to install the MDAI cluster locally.

- A quick installation script-based install gets the MDAI cluster up and running in minutes.
- A step-by-step install that let’s you see each of the components composing the MDAI cluster.

> [!NOTE]
> Instructions in our documentation are for *nix environments.

## Prerequisites

Before you install the MDAI cluster, you’ll need a GitHub account to access resources from MyDecisive repos.

You'll also need to install the following software.

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Kubernetes](https://kubernetes.io/releases/download/) (k8s)
- [kubectl and kind](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/)
- (Optional) [k9s](https://k9scli.io/topics/install/)

For the required MDAI cluster resources, clone the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs). This repo also contains the scripts resources needed for trying out the MyDecisive solutions.

Before you install the MDAI cluster, make sure Docker is running.

## Choose an Installation Method

{{< tabs items="Automatic Install, Guided Install" >}}

<!-- Tab A -->
  {{< tab >}}


    To automatically install the latest version of MDAI, use the `mdai-kind.sh` script available in the root directory of the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs) that you cloned. Make sure the script is executable>

    ```bash
    chmod +x mdai-kind.sh
    ```

    Run the script to install your local MDAI cluster:

    ```bash
    ./mdai-kind.sh install
    ```

You'll see a number of messages as cluster components are installed.

  {{< /tab >}}

<!-- Tab B -->
  {{< tab >}}


MDAI runs in a Kubernetes cluster. You'll use Helm charts to bring up the pods in the cluster.


### Bring Up the MDAI Cluster

1. Use `kind` to create a new cluster.
    ```
    kind create cluster --name mdai
    ```

2. Use `kubectl` to install cert-manager.
    ```
    kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
    ```
    ```
    kubectl wait --for=condition=Established crd/certificates.cert-manager.io --timeout=60s
    ```
    ```
    kubectl wait --for=condition=Ready pod -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
    ```
    ```
    kubectl wait --for=condition=Available=True deploy -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
    ```

   > [!TIP]
   > The cert-manager may take a few moments to finish installing. To see if they're ready, you can list the pods using `kubectl get pods -n cert-manager`.

3. Use Helm to install MDAI.
    ```
    helm upgrade --install \
      --repo https://charts.mydecisive.ai \
      --namespace mdai \
      --create-namespace \
      --cleanup-on-fail \
      --set mdai-operator.manager.env.otelSdkDisabled=true \
      --set mdai-gateway.otelSdkDisabled=true \
      --set mdai-s3-logs-reader.enabled=false \
      --version v0.8.0-rc3 \
      mdai mdai-hub
    ```

4. Verify that the cluster's pods are running.
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

  {{< /tab >}}
{{< /tabs >}}

## Explore MDAI Use Cases

When you're done installing the MDAI cluster, visit [Recipes List](../recipes) to explore available use cases.
