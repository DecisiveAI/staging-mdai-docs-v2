+++
title = 'Install MDAI'
weight = 20
+++

### Prerequisites

- Install [Docker](https://www.docker.com/products/docker-desktop/).
- Install [Kubernetes](https://kubernetes.io/releases/download/) (k8s).
- Install [kubectl and kind](https://kubernetes.io/docs/tasks/tools/).
- Install [Helm](https://helm.sh/docs/intro/install/).
- (Optional) Install [k9s](https://k9scli.io/topics/install/).

### Other Tools and Infrastructure Used in Installation
- [cert-manager](https://cert-manager.io/docs/installation/kubectl/).
- [MinIO](https://min.io/docs/minio/macos/index.html)

## Bring Up the MDAI Cluster

Make sure Docker is running.

1. Clone the MDAI Helm Repo.

   ```
   git clone git@github.com:DecisiveAI/mdai-helm-chart.git
   ```
2. Use kind in the **mdai-helm-chart root directory** to create a new cluster.
    ```
    kind create cluster --name mdai
    ```
3. Use kubectl to install cert-manager. Wait a few moments for cert-manager to finish installing.
    ```
    kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.17.0/cert-manager.yaml
    ```
4. Update helm dependancies in **mdai-helm-chart root directory**.
   ```
   helm dependency update .
   ```
5. Create the mdai namespace.
   ```
   helm upgrade --install --create-namespace --namespace mdai --cleanup-on-fail --wait-for-jobs mdai .
   ```
   > [!NOTE]
   > If running this command returns an error telling you to run `helm dependency build`, run `helm dependency update .` instead, then try again.
6. Verify that the cluster's pods are running.
   ```
   kubectl get pods -n mdai
   ```

If the cluster is running, you'll see output similar to the following.

```
NAME                                                READY   STATUS              RESTARTS   AGE
alertmanager-kube-prometheus-stack-alertmanager-0   0/2     Init:0/1            0          9s
event-handler-webservice-544c79cd7b-p5nxj           1/1     Running             0          19s
kube-prometheus-stack-operator-6b9bcb8467-h9b6n     1/1     Running             0          19s
mdai-grafana-74cd6866f4-kd2bg                       0/3     PodInitializing     0          19s
mdai-kube-state-metrics-f6c7956f7-9vmwv             0/1     Running             0          19s
mdai-operator-controller-manager-76fd6b479f-8tgcb   0/1     ContainerCreating   0          18s
mdai-prometheus-node-exporter-8v2m5                 1/1     Running             0          19s
mdai-valkey-primary-0                               0/1     Running             0          18s
opentelemetry-operator-5bcc6c77df-ppqhq             0/1     Running             0          19s
prometheus-kube-prometheus-stack-prometheus-0       0/2     Init:0/1            0          9s
```

## Set Up the MDAI Hub

1. From the [MDAI Example Config repo](https://github.com/DecisiveAI/configs/blob/main/mdaihub_config.yaml), copy the `mdaihub_config.yaml` into your working directory.

```
kubectl apply -f mdaihub_config.yaml
```

2. Verify the hub is applied by running

```
kubectl get customresourcedefinitions mdaihubs.hub.mydecisive.ai
```

Your output should look as follows
```
NAME                         CREATED AT
mdaihubs.hub.mydecisive.ai   2025-03-24T20:02:19Z
```

### Success

After installing MinIO, you'll be ready to test drive MyDecisive solutions.
