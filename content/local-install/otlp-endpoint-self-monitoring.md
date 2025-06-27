+++
title = 'Self-Monitoring via OTLP Endpoint'
weight = 25
+++

## MDAI with Self-Monitoring via OTLP Endpoint

Send MDAI Smart Telemetry hub component logs to a new or existing (not provided by MDAI) OTLP HTTP destination to fully-customize your explainability of MDAI operations.

#### Step 1: Config Updates

You can update the `values.yaml` [(found in our mdai-hub repo)](https://github.com/DecisiveAI/mdai-hub/blob/main/values.yaml) to modify where logs are sent. This destination must be able to accepts OTLP HTTP logs.

Changes should be made in the following locations:

1. [MDAI Operator Blob](https://github.com/DecisiveAI/mdai-hub/blob/422e1c345806f634ed92db2a67a672ed7e9c7101/values.yaml#L52)

    ```
    mdai-operator:
      enabled: true
      fullnameOverride: mdai-operator
      controllerManager:
        manager:
          env:
            otelExporterOtlpEndpoint: http://your-otlp-endpoint:4318
    ```

2. [mdai-gateway blob](https://github.com/DecisiveAI/mdai-hub/blob/a10d29cbe0331b1f22b41c576754dff702685a55/values.yaml#L47)
    ```
    mdai-gateway:
      enabled: true
      otelExporterOtlpEndpoint: http://your-otlp-endpoint:4318
    ```

### Step 2: Install MDAI

***Note**: Make sure you can access `values.yaml` your working directory. You have have to clone the [`mdai-hub`]((https://github.com/DecisiveAI/mdai-hub/blob/main/values.yaml)) repo and use it as your working directory while for the next step.*

```sh
helm upgrade --install \
  mdai mdai-hub \
  --repo https://charts.mydecisive.ai \
  --version v0.8.0-dev \
  --namespace mdai \
  --create-namespace \
  --cleanup-on-fail
  --values values.yaml
```

### Step 3: Install Log Generators

>[!NOTE]
>Switch to [mdai-labs](https://github.com/DecisiveAI/mdai-labs/tree/main) as your working directory**

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