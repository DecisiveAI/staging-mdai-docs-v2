+++
title = 'Via OTLP'
sectionPagesMenu = "self-monitoring"
weight = 2
+++


# MDAI Self-Monitoring with OTLP Endpoint

Send MDAI Smart Telemetry hub component logs to a new or existing (not provided by MDAI) OTLP HTTP destination to fully-customize your explainability of MDAI operations.

## Config Updates

We have default `mdai-hub` settings tha can be found in our `values.yaml` [(found in our mdai-helm-chart repo)](https://github.com/DecisiveAI/mdai-helm-chart/blob/main/values.yaml). You can modify where logs are sent by updating.

> [!WARNING]
>
> This destination must be able to accepts OTLP HTTP logs.

Defaults can be found at these locations:
1. [MDAI Operator Blob](https://github.com/DecisiveAI/mdai-helm-chart/blob/422e1c345806f634ed92db2a67a672ed7e9c7101/values.yaml#L52)

1. [mdai-gateway blob](https://github.com/DecisiveAI/mdai-helm-chart/blob/422e1c345806f634ed92db2a67a672ed7e9c7101/values.yaml#L59)


### Deploy hub


>[!NOTE]
>Be sure to update `http://your-otlp-endpoint:4318` in the following installation command

```
  helm upgrade --install mdai mdai-hub \
    --repo https://charts.mydecisive.ai \
    --namespace mdai \
    --create-namespace \
    --version v0.8.0-rc3 \
    --set event-handler-webservice.otelExporterOtlpEndpoint="http://your-otlp-endpoint:4318" \
    --set mdai-operator.controllerManager.manager.env.otelExporterOtlpEndpoint="http://your-otlp-endpoint:4318" \
    --set mdai-s3-logs-reader.enabled=false
    --cleanup-on-fail >/dev/null 2>&1 || echo "⚠️ mdai: unable to install helm chart"
```

