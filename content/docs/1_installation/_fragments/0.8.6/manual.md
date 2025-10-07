### Install `mdai`

MDAI runs in a Kubernetes cluster. You'll use Helm charts to bring up the pods in the cluster.


#### Install a kind cluster

This command installs a kind cluster

```bash
kind create cluster --name mdai
```

#### Install `mdai`


{{% details title="Option 1: With cert-manager" closed="true" %}}

This command installs `cert-manager`

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
kubectl wait --for=condition=Established crd/certificates.cert-manager.io --timeout=60s
kubectl wait --for=condition=Ready pod -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
kubectl wait --for=condition=Available=True deploy -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
```

This command installs `mdai`

```bash
helm upgrade --install \
    mdai oci://ghcr.io/decisiveai/ \mdai-hub \
    --namespace mdai \
    --create-namespace \
    --version 0.8.6 \
    --set mdai-operator.manager.env.otelSdkDisabled=true \
    --set mdai-gateway.otelSdkDisabled=true \
    --set mdai-s3-logs-reader.enabled=false \
    --values values/overrides_0.8.6.yaml \
    --cleanup-on-fail
```

{{% /details %}}


{{% details title="**Option 2: Without cert-manager**" closed="true" %}}

```bash
helm upgrade --install mdai-hub oci://ghcr.io/decisiveai/mdai-hub \
    --version 0.8.6 \
    --namespace mdai \
    --create-namespace \
    --set mdai-operator.manager.env.otelSdkDisabled=true \
    --set mdai-gateway.otelSdkDisabled=true \
    --set mdai-s3-logs-reader.enabled=false \
    --set opentelemetry-operator.admissionWebhooks.certManager.enabled=false \
    --set opentelemetry-operator.admissionWebhooks.autoGenerateCert.enabled=true \
    --set opentelemetry-operator.admissionWebhooks.autoGenerateCert.recreate=true \
    --set opentelemetry-operator.admissionWebhooks.autoGenerateCert.certPeriodDays=365 \
    --set mdai-operator.admissionWebhooks.certManager.enabled=false \
    --set mdai-operator.admissionWebhooks.autoGenerateCert.enabled=true \
    --set mdai-operator.admissionWebhooks.autoGenerateCert.recreate=true \
    --set mdai-operator.admissionWebhooks.autoGenerateCert.certPeriodDays=365 \
    --values values/overrides_0.8.6.yaml \
    --cleanup-on-fail
```

{{% /details %}}


You'll see a number of messages as cluster components are installed. Verify that the cluster's pods are running.

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
