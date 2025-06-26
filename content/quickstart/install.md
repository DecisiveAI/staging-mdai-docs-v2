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

## Install MDAI into your cluster
MDAI runs in a Kubernetes cluster. You'll use Helm charts to bring up the pods in the cluster.

### MDAI Labs
We've put together some pre-defined solutions and an **automated installation** in our [mdai-labs](https://github.com/DecisiveAI/mdai-labs/blob/main/README.md) repo. 

1. Clone [mdai-labs](https://github.com/DecisiveAI/mdai-labs/tree/main) repo and use as your working directory

> [!NOTE]
> If you choose to use automated installation method, follow the automated install steps on mdai-labs readme. Jump over to our [Setup IAM & MDAI Collector User Guide](./aws/setup_iam_longterm_user_s3.md) for Self-Monitoring S3 set up. Then skip ahead to [Set Up a Dashboard](./dashboard.md)

---

### Manual Installation

There are two main manual installation methods. The **[MDAI with Self-Monitoring](#manual-installation-a-mdai-with-self-monitoring-recommended)** is our recommended approach.

> Steps 2 and 3 below are required for both manual installations methods

2. Use kind to create a new cluster.
  ```bash
  kind create cluster --name mdai
  ```

3. Use kubectl to install cert-manager.

```bash
  kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
  kubectl wait --for=condition=Established crd/certificates.cert-manager.io --timeout=60s
  kubectl wait --for=condition=Ready pod -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
  kubectl wait --for=condition=Available=True deploy -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
```
  > [!NOTE]
  > Wait a few moments for cert-manager to finish installing.

### Manual Installation A: MDAI with Self-Monitoring (**Recommended**) 

**MDAI with Self-Monitoring.** Send MDAI Smart Telemetry hub component logs to an S3 bucket for explainability of MDAI operations. 
   
**If you have an AWS account or would like to set one up use this installation method**     

4a.  **Setup Long-Term IAM User and MDAI Collector**  
  - This is an involved step and is **required** for this installation method.  
  - Jump over to our [Setup IAM & MDAI Collector User Guide](./aws/setup_iam_longterm_user_s3.md).  
  
5a. **Install MDAI Hub Helm**  
  ```bash
   helm upgrade --install \
     mdai-hub oci://ghcr.io/decisiveai/mdai-hub \
     --version --devel \
     --namespace mdai \
     --create-namespace \
     --cleanup-on-fail
  ```
---  

### Manual Installation B: MDAI with Without Self-Monitoring (**Not Recommended**)

**MDAI without Self-Monitoring.** If you do not have an AWS account, please use this installation method.

4b. **Install MDAI Hub Helm without Self-Monitoring**  
   ```bash
    helm upgrade --install \
      mdai mdai-hub \
      --repo https://charts.mydecisive.ai \
      --set mdai-s3-logs-reader.enabled=false
      --version v0.8.0-rc3 \
      --namespace mdai \
      --create-namespace \
      --cleanup-on-fail
  ```

  >[!INFO]
  >Additional [MDAI-supported installation methods](./installMethods.md)
---

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

> [!NOTE]
> If you see **CreateContainerConfigError** on mdai-s3-logs-reader, be sure you followed [Setup IAM & MDAI Collector User Guide](./aws/setup_iam_longterm_user_s3.md)

---

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

Now that MDAI is running, we can go on to [generate log data](pipelines.html).

