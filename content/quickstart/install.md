+++
title = 'Install MDAI'
weight = 20
+++

You'll need a GitHub account to install MDAI.

## Install Tools and Infrastructure

1. Clone the MDAI Helm Repo.
   ```
   git clone git@github.com:DecisiveAI/mdai-helm-chart.git
   ```
2. Install [Docker](https://www.docker.com/products/docker-desktop/).
3. Install [Kubernetes](https://kubernetes.io/releases/download/) (k8s).
4. Install [kubectl and kind](https://kubernetes.io/docs/tasks/tools/).
5. Install [Helm](https://helm.sh/docs/intro/install/).
6. (Optional) Install [k9s](https://k9scli.io/topics/install/).

## Bring Up the MDAI Cluster

1. Use kind in the mdai-helm-chart root directory to create a new cluster.
    ```
    kind create cluster --name mdai
    ```
2. Create the mdai namespace.
   ```
   helm upgrade --install --create-namespace --namespace mdai --cleanup-on-fail --wait-for-jobs mdai .
   ```
   > [!NOTE]
   > If running this command returns an error telling you to run `helm dependency build`, run `helm dependency update .` instead, then try again.
3. Verify that the cluster's pods are running.
   ```
   kubectl get pods -n mdai
   ```

If the cluster is running, you'll see output similar to the following.

```
NAME                                                READY   STATUS              RESTARTS   AGE
datalyzer-deployment-7867cff9fc-tmzdm               0/1     ContainerCreating   0          12s
kube-prometheus-stack-operator-6b9bcb8467-wq2rk     0/1     ContainerCreating   0          12s
mdai-api-c4644996-sjfdl                             1/1     Running             0          12s
mdai-grafana-7fbf4fc6c9-4nwf5                       0/3     Init:0/1            0          12s
mdai-kube-state-metrics-f6c7956f7-d757s             0/1     Running             0          12s
mdai-operator-controller-manager-6b89944689-v4qlv   0/2     ContainerCreating   0          12s
mdai-prometheus-node-exporter-9zv5z                 1/1     Running             0          12s
opentelemetry-operator-57bd64b65d-cskql             0/1     Running             0          12s
```

## Install MinIO

[MinIO](https://min.io/docs/minio/macos/index.html) is object storage that provides an Amazon Web Services S3-compatible API and supports all core S3 features. Installing MinIO allows MDAI to work locally as if it had access to cloud storage.

After installing MinIO, you'll be ready to test drive MyDecisive solutions.
