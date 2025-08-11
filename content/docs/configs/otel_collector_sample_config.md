+++
title = 'MDAI OpenTelemetry Collector Sample Config'
weight = 20
+++

This **OpenTelemetry Collector (OTEL Collector) configuration** sample defines an **MDAI Gateway Collector**. It is responsible for receiving, processing, and exporting telemetry data (logs, traces, and metrics) within the MDAI ecosystem.

---

### Table of Contents

- [Summary](#summary)
- [**Key Components of the Configuration**](#key-components-of-the-configuration)
- [Configuration Breakdown](#configuration-breakdown)
  - [Receivers](#receivers)
  - [Extensions](#extensions)
  - [Processors](#processors)
  - [Exporters](#exporters)
  - [Service \& Pipelines](#service--pipelines)
  - [Custom Config to Copy](#custom-config-to-copy)

---

### Link to example config
[OpenTelemetry Collector (OTEL Collector) configuration](https://github.com/DecisiveAI/configs/blob/main/mdai_v1_opentelemetry_collector_sample_config_0_6_0.yaml)

[For additional examples and information visit OpenTelemetry](https://opentelemetry.io/docs/collector/configuration/)

---

## Summary
**MDAI Gateway OTEL Collector**:

✅ **Receives** logs via **Fluent Forward & OTLP**.
✅ **Filters & processes** logs using memory limits, batching, grouping, and attribute transformations.
✅ **Exports** telemetry to **MDAI Observer Collectors** and **local debugging logs**.
✅ **Ensures health checks** via the **`health_check` extension**.

## **Key Components of the Configuration**

| **Component** | **Required** | **Description** |
|--------------|------------|----------------|
| **API Version & Kind** | ✅ **YES** | Uses `opentelemetry.io/v1beta1`, defining an `OpenTelemetryCollector` resource. |
| **Metadata** | ✅ **YES** | Labels the collector with `mdaihub-name: mdaihub-sample` and deploys it in the `mdai` namespace. |
| **Image** | ✅ **YES** | Defines the container image used by the collector (`otel/opentelemetry-collector-contrib:0.117.0`). |
| **Environment Variables (`envFrom`)** | ❌ NO | Loads configuration from a **ConfigMap** (`mdaihub-sample-variables`). |

**Example Configuration:**
```yaml
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  labels:
    mdaihub-name: mdaihub-sample
  name: gateway-3
  namespace: mdai
spec:
  image: otel/opentelemetry-collector-contrib:0.117.0
  envFrom:
    - configMapRef:
        name: mdaihub-sample-variables
  config:
```

---

## Configuration Breakdown

### Receivers
Receivers define how the collector ingests telemetry data.

| **Receiver** | **Required** | **Description** |
|-------------|------------|----------------|
| **`fluentforward`** | ❌ NO | Receives logs via **Fluent Forward protocol** on port `8006`. |
| **`otlp`** | ✅ **YES** | Accepts telemetry in **OpenTelemetry Protocol (OTLP)** over `gRPC (4317)` and `HTTP (4318)`. |
| **CORS Settings** | ❌ NO | Allows **all origins (`*`)** for web-based telemetry ingestion. |

**Example Configuration:**
```yaml
    receivers:
      fluentforward:
        endpoint: '${env:MY_POD_IP}:8006'
      otlp:
        protocols:
          grpc:
            endpoint: '${env:MY_POD_IP}:4317'
          http:
            endpoint: '${env:MY_POD_IP}:4318'
            cors:
              allowed_origins:
                - "http://*"
                - "https://*"
```

---

### Extensions
Extensions add additional functionality to the collector.

| **Extension** | **Required** | **Purpose** |
|-------------|------------|------------|
| **`health_check`** | ✅ **YES** | Ensures the collector passes **readiness & liveness probes** at `13133`. **(Mandatory in MDAI Helm Chart)** |

**Example Configuration:**
```yaml
   extensions:
      health_check:
        endpoint: "${env:MY_POD_IP}:13133"
```
---

### Processors
Processors modify and filter telemetry data before exporting.

| **Processor** | **Required** | **Purpose** |
|-------------|------------|-------------|
| **`memory_limiter`** | ✅ **YES** | Ensures memory usage remains below **75%**, with a spike limit of **15%**. |
| **`batch`** | ✅ **YES** | Groups telemetry into **batches of 10,000 records** or after **13 seconds**. |
| **`groupbyattrs`** | ❌ NO | Groups logs by **`service.name`** to enable per-service aggregation. |
| **`resource/observer_receiver_tag`** | ❌ NO | Adds a **`observer_direction: received`** label to received telemetry. |
| **`resource/observer_exporter_tag`** | ❌ NO | Adds a **`observer_direction: exported`** label to exported telemetry. |
| **`filter/severity`** | ❌ NO | Filters logs, only keeping logs where **`log_level == INFO`**. |
| **`filter/service_list`** | ❌ NO | Filters logs based on **environment variable `${env:SERVICE_LIST_REGEX}`**, dynamically configuring services to be monitored. |

**Example Configuration:**
```yaml

processors:
    memory_limiter:
        check_interval: 23s
        limit_percentage: 75
        spike_limit_percentage: 15

    batch:
        send_batch_size: 10000
        timeout: 13s

    groupbyattrs:
        keys:
          - mdai_service

    resource/observer_receiver_tag:
        attributes:
            - key: observer_direction
              value: "received"
              action: upsert

    resource/observer_exporter_tag:
        attributes:
            - key: observer_direction
              value: "exported"
              action: upsert

    filter/service_list:
        error_mode: ignore
          logs:
              log_record:
                  - 'IsMatch(attributes["service.name"], "${env:SERVICE_LIST_REGEX}")'
```

---

### Exporters
Exporters send processed telemetry to external destinations.

| **Exporter** | **Required** | **Destination** |
|-------------|------------|----------------|
| **`debug`** | ❌ NO | Outputs telemetry to **local logs** for debugging. |
| **`otlp/observer`** | ✅ **YES** | Sends telemetry to **`mdaihub-sample-observer-collector-service`** via OTLP (`4317`). **TLS is disabled (`insecure: true`)**. |

**Example Configuration:**
```yaml
   exporters:
      debug: { }
      otlp/observer:
        endpoint: mdaihub-sample-observer-collector-service.mdai.svc.cluster.local:4317
        tls:
          insecure: true
```

---

### Service & Pipelines
Defines how telemetry flows through the system.

| **Pipeline** | **Required** | **Receivers** | **Processors** | **Exporters** |
|-------------|------------|--------------|---------------|--------------|
| **`logs/customer_pipeline`** | ✅ **YES** | `otlp`, `fluentforward` | `filter/service_list`, `memory_limiter`, `batch`, `groupbyattrs`, `resource/observer_exporter_tag` | `debug`, `otlp/observer` |
| **`logs/watch_receivers`** | ✅ **YES** | `otlp`, `fluentforward` | `memory_limiter`, `batch`, `groupbyattrs`, `resource/observer_receiver_tag` | `debug`, `otlp/observer` |

- The **customer pipeline** filters logs using `filter/service_list` before exporting.
- The **watch receivers pipeline** applies grouping and tagging before exporting.

**Example Configuration:**
```yaml
   service:
      telemetry:
        metrics:
          address: ":8888"
      extensions:
        - health_check
      pipelines:
        logs/customer_pipeline:
          receivers: [ otlp, fluentforward ]
          processors: [ filter/service_list, memory_limiter, batch, groupbyattrs, resource/observer_exporter_tag ]
          exporters: [ debug, otlp/observer ]

        logs/watch_receivers:
          receivers: [ otlp, fluentforward ]
          processors: [ memory_limiter, batch, groupbyattrs, resource/observer_receiver_tag ]
          exporters: [ debug, otlp/observer ]
```

---

### Custom Config to Copy

```yaml
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  labels:
    mdaihub-name: <your-mdaihub-name>
  name: <your-collector-name>
  namespace: <your-namespace>
spec:
  image: <your-otel-collector-image>
  envFrom:
    - configMapRef:
        name: <your-configmap-name>
  config:
    receivers:
      fluentforward:
        endpoint: '${env:MY_POD_IP}:<fluentforward-port>'
      otlp:
        protocols:
          grpc:
            endpoint: '${env:MY_POD_IP}:<otlp-grpc-port>'
          http:
            endpoint: '${env:MY_POD_IP}:<otlp-http-port>'
            cors:
              allowed_origins:
                - "http://*"
                - "https://*"

    extensions:
      health_check:
        endpoint: "${env:MY_POD_IP}:<health-check-port>"

    processors:
      memory_limiter:
        check_interval: <time-interval>
        limit_percentage: <memory-limit-percent>
        spike_limit_percentage: <spike-limit-percent>

      batch:
        send_batch_size: <batch-size>
        timeout: <batch-timeout>

      groupbyattrs:
        keys:
          - <your-grouping-key>

      resource/custom_tag:
        attributes:
          - key: <your-key>
            value: <your-value>
            action: upsert

      filter/severity:
        error_mode: ignore
        logs:
          log_record:
            - 'attributes["log_level"] == "<your-log-level>"'

      filter/custom_filter:
        error_mode: ignore
        logs:
          log_record:
            - 'IsMatch(attributes["<your-attribute>"], "${env:<your-env-variable>}")'

    exporters:
      debug: { }
      otlp/observer:
        endpoint: <your-otlp-endpoint>
        tls:
          insecure: <true|false>

    service:
      telemetry:
        metrics:
          address: ":<metrics-port>"
      extensions:
        - health_check
      pipelines:
        logs/custom_pipeline:
          receivers: [ <your-receivers> ]
          processors: [ <your-processors> ]
          exporters: [ <your-exporters> ]
```