+++
title = 'Self-Monitoring via S3'
weight = 25
+++

## MDAI Manual Install with Self-Monitoring via S3

Send MDAI Smart Telemetry hub component logs to an s3 bucket for explainability of MDAI operations.

---

### Step 1: Setup Long-Term IAM User and MDAI Collector

>[!CAUTION]
>
>***DO NOT IGNORE THIS STEP***
>
>This is an involved step that cannot be skipped

Follow our [Setup IAM for AWS & MDAI Collector User Guide](./aws/setup_iam_longterm_user_s3.md) before you continue.

> * **If you do not have an AWS account**, please see our [Alternative Install methods](./local-install.html)

### Step 2: Install MDAI dependencies via Helm

```sh
helm upgrade --install \
  mdai mdai-hub \
  --repo https://charts.mydecisive.ai \
  --version v0.8.0-dev \
  --namespace mdai \
  --create-namespace \
  --cleanup-on-fail
```
---

### Step 3: Install Log Generators

1. Initiate super noisy logs
```sh
 kubectl apply -f ./synthetics/loggen_service_xtra_noisy.yaml
```

2. Initiate semi-noisy logs
```sh
  kubectl apply -f ./synthetics/loggen_service_noisy.yaml
```

3. Initiate normal log flow
```sh
  kubectl apply -f ./synthetics/loggen_services.yaml
```

### Step 4: Create + Install MDAI Hub
```sh
  kubectl apply -f ./mdai/hub/hub_ref.yaml -n mdai
```

### Step 5: Create + Install collector
```sh
  kubectl apply -f ./otel/0.8/otel_guaranteed_working.yaml -n mdai
```

### Step 6: Fwd logs from the loggen services to MDAI
```sh
  helm upgrade --install --repo https://fluent.github.io/helm-charts fluent fluentd -f ./synthetics/loggen_fluent_config.yaml
```

### Step 7: Forward prometheus

```sh
  kubectl -n mdai port-forward svc/prometheus-operated 9090:9090
```
*Note: can also be done using k9s*

### Step 8: Check alerts in Prometheus

See your alerts and dynamic filtration in action

> Visit http://localhost:9090/alerts

## Success!