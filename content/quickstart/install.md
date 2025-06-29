+++
title = 'Install MDAI'
weight = 20
+++


<div style="align-items: center; display: flex; justify-content: center;">
  <a href="/quickstart">
    <img src="../stepper/2.1.png" alt="Step 2.1 - Complete">
  </a>
  <a href="#">
    <img src="../stepper/2.2.png" alt="Step 2.2 - Active">
  </a>
  <a href="../pipelines">
    <img src="../stepper/2.3.png" alt="Step 2.3">
  </a>
  <a href="../collect">
    <img src="../stepper/2.4.png" alt="Step 2.4">
  </a>
  <a href="../dashboard">
    <img src="../stepper/2.5.png" alt="Step 2.5">
  </a>
  <a href="../filter">
    <img src="../stepper/2.6.png" alt="Step 2.6">
  </a>
</div>

MDAI is configured and deployed using Helm charts, and runs in a Kubernetes cluster. You'll also install synthetic log generators to provide the telemetry data. That data can be sent to one of 3 destinations: 

- Your local machine. This is the simplest option. Follow the steps on this page.
- An [Open Telemetry Protocol](https://opentelemetry.io/docs/specs/otlp/) (OTLP) endpoint. You can use this if you have a backend system with an OTLP endpoint, or have one set up one up in AWS. With this setup, you can take advantage of MDAI's self monitoring feature. See [MDAI Installation with OTLP Endpoint](../local-install/otlp-endpoint-self-monitoring.md).
- An S3 bucket. If you have access to AWS account, you can set up a user and an S3 bucket to receive telemetry data. With this setup, you can take advantage of MDAI's self monitoring feature. See [Setup IAM & MDAI Collector User Guide](setup_iam_longterm_user_s3.md).

The quick-start installation options are intended for demonstration purposes and not intended for production environments.

To make installing MDAI easy, we've put together some pre-defined solutions and an [automated installation](../local-install/automated.md) in our [mdai-labs](https://github.com/DecisiveAI/mdai-labs/blob/main/README.md) repo. Before you start, clone [mdai-labs](https://github.com/DecisiveAI/mdai-labs/tree/main) and use its root directory as your working directory.


## Install MDAI Into Your Cluster

There are 2 ways to install MDAI.

- The automated installation saves time and helps you avoid command-line mistakes.
- The manual install helps you better understand what components run in the MDAI cluster and how they work together.

### Automated Installation

1. Make the installation script executable.
```
chmod +x mdai-kind.sh
```

2. Install the cluster.
```
./mdai-kind.sh install
```

#### Uninstall the Cluster

To completely uninstall the cluster:

1. Delete the cluster.
```
./mdai-kind.sh delete
```

2. Delete deployed configuration and all of the resources in the `MDAI` namespace.
```
./mdai-kind.sh rm_configs
```


### Manual Installation

1. Use kind to create a new cluster.
  ```bash
  kind create cluster --name mdai
  ```

2. Use kubectl to install cert-manager.

```bash
  kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
  kubectl wait --for=condition=Established crd/certificates.cert-manager.io --timeout=60s
  kubectl wait --for=condition=Ready pod -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
  kubectl wait --for=condition=Available=True deploy -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
```
  Wait a few moments for cert-manager to finish installing.

3. Install the MDAI Hub with Helm.

  ```bash
   helm upgrade --install \
     mdai-hub oci://ghcr.io/decisiveai/mdai-hub \
     --version --devel \
     --namespace mdai \
     --create-namespace \
     --cleanup-on-fail
  ```

## Verify that the cluster's pods are running
   ```
   kubectl get pods -n mdai
   ```

    If the cluster is running, you'll see output similar to the following.

    ```
    NAME                                                READY   STATUS                       RESTARTS   AGE
    alertmanager-kube-prometheus-stack-alertmanager-0   2/2     Running                      0          11m
    kube-prometheus-stack-operator-6cfdc788d4-l9vn7     1/1     Running                      0          12m
    mdai-event-hub-556c8897f5-fss8k                     1/1     Running                      0          12m
    mdai-gateway-64cb746f-slm6f                         1/1     Running                      0          12m
    mdai-grafana-84bb594f6c-s5xwt                       3/3     Running                      0          12m
    mdai-kube-state-metrics-6cd9fd8458-m2dzg            1/1     Running                      0          12m
    mdai-operator-controller-manager-65955fb98b-vsvqg   1/1     Running                      0          12m
    mdai-prometheus-node-exporter-2427z                 1/1     Running                      0          12m
    mdai-rabbitmq-0                                     1/1     Running                      0          12m
    mdai-s3-logs-reader-7dc95b7479-94ml9                0/1     Running                      0          12m 
    mdai-valkey-primary-0                               1/1     Running                      0          12m
    opentelemetry-operator-6d8ddbdc4d-8hbcj             1/1     Running                      0          12m
    prometheus-kube-prometheus-stack-prometheus-0       2/2     Running                      0          11m
    ```


## Install MDAI Smart Telemetry Hub

1. Apply the configuration to the hub resource.
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

## Success

If you used the automated installation, skip ahead to [Set Up a Dashboard](dashboard).

For the manual installation, next you'll [generate log data](pipelines).

