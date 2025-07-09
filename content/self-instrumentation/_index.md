+++
title = 'MDAI Self-Monitoring'
url = '/self-monitoring'
sectionPagesMenu = "self-monitoring"
weight = 20
+++

## About Self-monitoring

The MDAI Smart Telemetry Hub contains complex infrastructure. To maintain and monitor operational excellence, we have included an opt-in capability to create an understanding internal metrics, audit history of change events, and log streams affording traceability across our services and their events.


## How it works

The `mdai-helm-chart` installed `mdai-operator` and `mdai-gateway` expect a destination to send their logs to, but this chart does not manage deploying the logs destination for those services.

The `mdai-operator` has the ability to manage an opinionated collector, via compatible configurations, called the `mdai-collector` (sometimes referred to as the `hub-monitor`). The `mdai-collector` receives from this fixed list of services and sends the logs to a compatible destination.


## Compatible Destinations

There are currently two compatible destinations the `mdai-collector` supports
1. S3 (preferred)
2. OTLP endpoint


### MDAI Collector -> S3 (MDAI Recommended)

Send MDAI Smart Telemetry hub component logs to an s3 bucket.

[Jump ahead to instructions](s3.md)


### MDAI Collector -> OTLP endpoint

Send MDAI Smart Telemetry hub component logs to a custom OTLP HTTP destination.

[Jump ahead to instructions](./otlp.md)


## Opt-out of Self-Monitoring

You can also choose to opt-out of self-monitoring by disabling OTel logging for MDAI components.

If you do not want to send logs from these components, you can disable sending logs by updating the help install command by changing the following settings:
1. `mdai-operator.manager.env.otelSdkDisabled` to `"true"`
2. `mdai-gateway.otelSdkDisabled` to `"true"`
3. `mdai-s3-logs-reader.enabled` to `"false"`
 (a string value, not boolean).

 ```
 helm upgrade --install mdai mdai-hub \
  --repo https://charts.mydecisive.ai \
  --namespace mdai \
  --create-namespace \
  --version v0.8.0-rc3 \
  --set mdai-operator.manager.env.otelSdkDisabled=true \
  --set mdai-gateway.otelSdkDisabled=true \
  --set mdai-s3-logs-reader.enabled=false \
  --cleanup-on-fail >/dev/null 2>&1 || echo "⚠️ mdai: unable to install helm chart"
 ```


