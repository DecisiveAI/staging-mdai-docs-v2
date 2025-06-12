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


## Bring Up the MDAI Cluster

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
3. Update the repo.
   ```
   helm repo update
   ```

4. Create the mdai namespace.
   ```
   helm upgrade --install --create-namespace --namespace mdai --cleanup-on-fail --wait-for-jobs mdai mdai/mdai-hub --version v0.8.0-rc1
   ```
   > [!NOTE]
   > If running this command returns an error telling you to run `helm repo update`, then try again.

5. Verify that the cluster's pods are running.
   ```
   kubectl get pods -n mdai
   ```

If the cluster is running, you'll see output similar to the following.

```
NAME                                                READY   STATUS    RESTARTS   AGE
alertmanager-kube-prometheus-stack-alertmanager-0   2/2     Running   0          50s
event-handler-webservice-57d9d88c5f-r6kgf           1/1     Running   0          59s
kube-prometheus-stack-operator-6cfdc788d4-pgrx2     1/1     Running   0          59s
mdai-grafana-68d9c9474c-gh6ff                       3/3     Running   0          59s
mdai-kube-state-metrics-6cd9fd8458-cn9bq            1/1     Running   0          59s
mdai-operator-controller-manager-66f9696ff7-7s9j6   1/1     Running   0          59s
mdai-prometheus-node-exporter-6wvll                 1/1     Running   0          59s
mdai-valkey-primary-0                               1/1     Running   0          59s
opentelemetry-operator-6d8ddbdc4d-pcwrb             1/1     Running   0          59s
prometheus-kube-prometheus-stack-prometheus-0       2/2     Running   0          50s
```

## Set Up the MDAI Hub

1. From the [MDAI Example Config repo](https://github.com/DecisiveAI/configs/blob/main/mdaihub_config.yaml), copy the `mdaihub_config.yaml` file into your working directory.

2. Apply the configuration to the hub resource.
   ```
   kubectl apply -f mdaihub_config.yaml
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

