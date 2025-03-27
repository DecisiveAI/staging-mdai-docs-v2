+++
title = 'Grafana Dashboards'
+++

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Prerequisites:](#prerequisites)
- [Test Grafana Dashboards:](#test-grafana-dashboards)
- [Dashboards](#dashboards)
  - [MDAI Audit Stream](#mdai-audit-stream)
    - [Key Features:](#key-features)
  - [MDAI Data Management](#mdai-data-management)
    - [Key Features:](#key-features-1)
    - [Metrics Tracked:](#metrics-tracked)
  - [MDAI Cluster Usage](#mdai-cluster-usage)
    - [Key Features:](#key-features-2)
    - [Metrics Tracked:](#metrics-tracked-1)
  - [MDAI Controller Runtime Metrics](#mdai-controller-runtime-metrics)
  - [MDAI USE dashboard](#mdai-use-dashboard)
    - [Key Features:](#key-features-3)
  - [OpenTelemetry Collector](#opentelemetry-collector)

## Prerequisites:
- MDAI installed on a cluster
- Data flowing through MDAI Hub

## Test Grafana Dashboards:
With a cluster running and data flowing through the cluster:

- Port Forward MDAI Grafana Instance:
  - `kubectl port-forward svc/mdai-grafana 3000:3000 -n mdai`
- Port forward MDAI event-handler-webservice
  - `kubectl port-forward svc/event-handler-webservice 8081:8081 -n mdai`

## Dashboards
### MDAI Audit Stream
The **MDAI Audit Stream** dashboard provides real-time visibility into system events, actions, and collector restarts for your **MDAI Hub Custom Resource Configuration**. See your configurations and MDAI processes working.

#### Key Features:
- Data source uses InfinityJSON datasource to access endpoint 8081
- Table that that will clearly communicate and visualize the MDAI audit stream
  - **Timestamp**: When audit happened
  - **Event**: What happened
  - **Hub**: Which hub
  - **Trigger**: Why it happened
  - **Context**: Metadata
  - **Result**: Info about what happened after; payload
---
### MDAI Data Management
The **MDAI Data Management** dashboard shows the received and exported metrics for data running through MDAI, offering a high-level view of metrics for configured data being monitored and filtered via MDAI using **MDAI Hub Custom Resource Configuration**.

#### Key Features:
- Uses Prometheus as the primary datasource
- Provides real-time insights into ingress and egress filtered through MDAI
- Customizable metric options, data type, and group by label
#### Metrics Tracked:
- MDAI I/O by {groupByLabel}
  - Shows how many group by label monitored based on the current selected time interval
- I/O {dataType}
  - Total ingress and egress data type filtered through MDAI operator
- Average Percentage Difference I/O
  - Average percentage difference between ingress and egress data type
- MDAI I/O by {groupByLabel}
  - Total number of data type and size per service based on time interval for ingress and egress
- Top Talkers I/O {dataType} Totals
  - Total number of data type from top talkers group by label based on time interval for ingress and egress
- MDAI Active Filters for {dataType}
  - Current active filters for data type limiting egress of data type

---
### MDAI Cluster Usage
The **MDAI Cluster Usage** dashboard provides an overview of Kubernetes cluster resource utilization. It helps monitor namespace-specific CPU and memory usage in real-time.

Based on public dashboard: [Kubernetes / Views / Namespaces](https://grafana.com/grafana/dashboards/15758-kubernetes-views-namespaces/)

#### Key Features:
- Displays CPU and RAM usage per namespace relative to total cluster resources.
- Uses Prometheus as the primary datasource.
#### Metrics Tracked:
- Displays CPU and RAM usage per namespace relative to total cluster resources.
- Uses Prometheus as the primary datasource.
- Includes visualizations: gauge charts, time series graphs, and stat panels.
---
### MDAI Controller Runtime Metrics
Observe the metrics exported by controller metrics and collected by Prometheus. This is a dashboard that is generated via [Grafana Plugin (grafana/v1-alpha)](https://book.kubebuilder.io/plugins/available/grafana-v1-alpha). The Grafana plugin supports scaffolding manifests for custom metrics, which can be found [here](https://book.kubebuilder.io/plugins/available/grafana-v1-alpha#visualize-custom-metrics).

---
###  MDAI USE dashboard
The **MDAI USE Dashboard** provides real-time monitoring of CPU and memory usage across key MDAI components, ensuring optimal performance and resource utilization.
#### Key Features:
- Tracks **CPU and memory usage** for:
  - **Gateway Collector** (Handles data ingestion)
  - **MDAI Operator** (Manages MDAI Hub resources)
  - **OpenTelemetry Operator** (Observability framework)
  - **Prometheus** (Monitoring system)
- Uses **Prometheus** as the data source.
- Provides a **time-series visualization** for resource trends over time.
---
### OpenTelemetry Collector
The **OpenTelemetry Collector** dashboard is a visualisation of OpenTelemetry collector metrics from Prometheus.

Based on public dashboard: [OpenTelemetry Collector](https://grafana.com/grafana/dashboards/15983-opentelemetry-collector/)