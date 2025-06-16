# MDAI Install Methods

>[!INFO]
>**Read about [self-monitoring](self_monitoring.md) with MDAI to understand the right choice for you.**
>
>***We highly recommend choosing self-monitoring.***

## MDAI with Self-Monitoring via OTLP Endpoint

Send MDAI Smart Telemetry hub component logs to a new or existing (not provided by MDAI) OTLP HTTP destination to fully-customize your explainability of MDAI operations.

### Config Updates

You can update the `values.yaml` to send logs to a destination of your choosing that accepts OTLP HTTP logs in the following locations:

1. [Operator Blob](https://github.com/DecisiveAI/mdai-helm-chart/blob/422e1c345806f634ed92db2a67a672ed7e9c7101/values.yaml#L52)

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


## Opt-out of Self-Monitoring

You can also choose to opt-out of self-monitoring by disabling OTel logging for MDAI components.

If you do not want to send logs from these components, you can disable sending logs by updating the `values.yaml` by setting `mdai-operator.manager.env.otelSdkDisabled` and `mdai-gateway.otelSdkDisabled` to `"true"` (a string value, not boolean).

> ℹ️ To stop logs from sending to s3, you will need to delete the MdaiCollector Custom Resource
**Install MDAI Collector**

```sh
helm upgrade --install --create-namespace --namespace mdai --cleanup-on-fail --wait-for-jobs mdai mdai/mdai-hub --set mdai-s3-logs-reader.enabled=false --version v0.8.0-dev
```

## MDAI Collector without Self-Monitoring (opt-out)

>[!WARNING]
>
>Without this capability, you will not have access to our built-in, self-instrumentation that ensures visibility and accuracy of MDAI operations.




