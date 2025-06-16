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


MDAI runs in a Kubernetes cluster. You'll use Helm charts to bring up the pods in the cluster.

## Install MDAI into your cluster

Make sure Docker is running.

1. Use kind to create a new cluster.
    ```
    kind create cluster --name mdai
    ```

2. Use kubectl to install cert-manager. Wait a few moments for cert-manager to finish installing.
    ```
    kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
    ```

3. Install `mdai` helm repo and ensure it's up to date.
   ```
   helm repo add mdai https://decisiveai.github.io/mdai-helm-charts
   ```
4. Update the repo.
   ```
   helm repo update
   ```

5. Install MDAI dependencies via Helm chart

   See our [Install methods](./installMethods.md) for choosing the correct install method.


6. Verify that the cluster's pods are running.
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
mdai-s3-logs-reader-7dc95b7479-94ml9                0/1     CreateContainerConfigError   0          12m
mdai-valkey-primary-0                               1/1     Running                      0          12m
opentelemetry-operator-6d8ddbdc4d-8hbcj             1/1     Running                      0          12m
prometheus-kube-prometheus-stack-prometheus-0       2/2     Running                      0          11m
```

<br />

> ❌ **Expected Error**
>
>You will now see an error with the service, `mdai-s3-logs-reader`, until you finish adding valid AWS IAM long-term credentials. Instructions to follow.

**Setup Long-Term IAM User and MDAI Collector**

Jump to [Setup IAM Long-term User](./aws/setup_iam_longterm_user_s3.md) for setting up a user and access keys for your cluster.

*After running through the IAM and collector setup, skip ahead to [MDAI Labs](#mdai-labs)*


## MDAI Labs

We've put together some pre-defined solutions in our [mdai-labs](https://github.com/DecisiveAI/configs/blob/main/mdaihub_config.yaml) repo. Please pull this repo down and make it your working directory.

## Install MDAI Smart Telemetry Hub

1. Apply the configuration to the hub resource.
   ```
   kubectl apply -f ./mdai/hub/0.8/hub_guaranteed_working.yaml -n mdai
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


### Success

Now that MDAI is running, we can go on to [generate log data](pipelines.html).

