+++
title = 'Without Self-Monitoring'
weight = 25
+++

## MDAI without Self-Monitoring
>[!TIP]
>**Read about [self-monitoring](self_monitoring) with MDAI to understand the right choice for you.**
>
>***We highly recommend choosing self-monitoring.***

### Step 1: Config Updates - Opt-out of Self-Monitoring

You can also choose to opt-out of self-monitoring by disabling OTel logging for MDAI components.

If you do not want to send logs from these components, you can disable sending logs to the MDAI Collector by updating the `values.yaml` [(found in our mdai-hub repo)](https://github.com/DecisiveAI/mdai-hub/blob/main/values.yaml).

You must change `otelSdkDisabled: "true"` in two locations:

1. [MDAI Operator Blob](https://github.com/DecisiveAI/mdai-hub/blob/422e1c345806f634ed92db2a67a672ed7e9c7101/values.yaml#L54)
    ```
    mdai-operator:
      enabled: true
      fullnameOverride: mdai-operator
      controllerManager:
        manager:
          env:
            otelExporterOtlpEndpoint: http://hub-monitor-mdai-collector-service.mdai.svc.cluster.local:4318
            otelSdkDisabled: "true"
    ```

2. [mdai-gateway blob](https://github.com/DecisiveAI/mdai-hub/blob/a10d29cbe0331b1f22b41c576754dff702685a55/values.yaml#L48)
    ```
    mdai-gateway:
      enabled: true
      otelExporterOtlpEndpoint: http://hub-monitor-mdai-collector-service.mdai.svc.cluster.local:4318
      otelSdkDisabled: "true"
    ```

### Step 2: Install MDAI

***Note**: Make sure you can access `values.yaml` your working directory. You have have to clone the `mdai-hub` repo.*

```sh
 helm upgrade --install \
   mdai mdai-hub \
   --repo https://charts.mydecisive.ai \
   --set mdai-s3-logs-reader.enabled=false
   --version v0.8.0-dev \
   --namespace mdai \
   --create-namespace \
   --cleanup-on-fail
```

>[!WARNING]
>
>Without this capability, you will not have access to our built-in, self-instrumentation that ensures visibility and accuracy of MDAI operations.

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