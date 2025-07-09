+++
title = 'Via OTLP'
sectionPagesMenu = "self-monitoring"
weight = 2
+++


# MDAI Self-Monitoring with OTLP Endpoint

Send MDAI Smart Telemetry hub component logs to a new or existing (not provided by MDAI) OTLP HTTP destination to fully-customize your explainability of MDAI operations.

#### Config Updates

You can update the  `values.yaml` [(found in our mdai-helm-chart repo)](https://github.com/DecisiveAI/mdai-helm-chart/blob/main/values.yaml) to modify where logs are sent. This destination must be able to accepts OTLP HTTP logs.

Changes should be made in the following locations:

1. [MDAI Operator Blob](https://github.com/DecisiveAI/mdai-helm-chart/blob/422e1c345806f634ed92db2a67a672ed7e9c7101/values.yaml#L52)

    ```
    mdai-operator:
      enabled: true
      fullnameOverride: mdai-operator
      controllerManager:
        manager:
          env:
            otelExporterOtlpEndpoint: http://your-otlp-endpoint:4318
    ```

2. [mdai-gateway blob](https://github.com/DecisiveAI/mdai-helm-chart/blob/422e1c345806f634ed92db2a67a672ed7e9c7101/values.yaml#L59)
    ```
    event-handler-webservice:
      enabled: true
      otelExporterOtlpEndpoint: http://your-otlp-endpoint:4318
    ```

