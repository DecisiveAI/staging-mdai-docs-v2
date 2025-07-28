+++
title = 'MDAI Observer Custom Resource Sample Config'
weight = 20
+++



The **MDAI Observer Custom Resource** provides a declarative way to define **observers** and **observer resource** within the **MDAI ecosystem**. It allows fine-grained control over telemetry processing and alerting.

### Table of Contents

- [ObserverResources](#observerresource)
- [Observers](#observers)

---
### Link to example config
[MDAI Observer Sample Config](https://github.com/DecisiveAI/mdai-labs/blob/main/mdai/observer/observer_ref.yaml)

---

## ObserverResource

Observer Resource is used to run the observers defined below. This is a service that receives telemetry via **GRPC (port 4317) or HTTP (port 4318)** and emit metrics to be scraped by **Prometheus**. This block tells the **MDAI Operator** how to provision these services, allowing them to scale with your collector fleet.

| Variable   | Required | Description                                                                                                                                                                                                   |
|------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`image`** |  ❌ NO | Docker image for the observer resource. Default: `public.ecr.aws/decisiveai/observer-collector:0.1` as it is pre-configured to work as an observer                                                            |
| **`replicas`** | ❌ NO (default: `1`) | The number of replicas for k8s to spin up for this observer. We recommend matching the total number of replicas in your collector fleet that will be sending to these observer resources.                     |
| **`resources`** | ❌ NO | A standard kubernetes [resource definition](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits). We recommend matching the resources of your collector fleet. |

**Example Configuration:**
```yaml
observerResource:
  image: public.ecr.aws/decisiveai/observer-collector:0.1
  replicas: 3
  resources:
    limits:
      memory: "512Mi"
      cpu: "200m"
    requests:
      memory: "128Mi"
      cpu: "100m"
```

> ℹ️ In this example, we have defined an observer resource that uses the observer-collector image, with three replicas and set k8s resource limits.

---

## Observers

Observers are **MDAI Operator-managed components** that observe telemetry flowing through them and emit metrics based on that telemetry. Your **OpenTelemetry collector configuration** must export data to one or more of these observers for them to generate metrics.

| Variable   | Required | Description |
|------------|----------|-------------|
| **`name`** | ✅ **YES** | Unique name of the observer. |
| **`labelResourceAttributes`** | ❌ NO | Attributes taken from telemetry resources to facet generated metrics by. |
| **`countMetricName`** | ❌ NO | The metric this observer will export to Prometheus for the count of individual telemetry records (such as log messages) measured by the observer. |
| **`bytesMetricName`** | ❌ NO | The metric this observer will export to Prometheus measuring the bytes of the telemetry measured by this observer. |
| **`filter`** | ❌ NO | OpenTelemetry [filterprocessor configuration](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md) to be applied to the telemetry flowing through the processor. Supports [OTTL](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/README.md) operations. |

> ⚠️ **At least one of `countMetricName` or `bytesMetricName` must be defined** for a valid observer to be created.

> ⚠️ **Warning**: Using many attributes or attributes with highly unique values (e.g., `transactionId`, `requestId`) can cause **high cardinality issues**, impacting MDAI system performance. Read more in [this post](https://grafana.com/blog/2022/02/15/what-are-cardinality-spikes-and-why-do-they-matter/) by Grafana Labs.

**Example Configuration:**
```yaml
observers:
  - name: service_team
    labelResourceAttributes:
      - service.name
      - team
    countMetricName: items_received_by_service_total
    bytesMetricName: bytes_received_by_service_total
    filter:
      error_mode: ignore
      logs:
        log_record:
          - 'attributes["log_severity"] == "info"'
```

> ℹ️ In this example, we have defined an observer that will measure telemetry counts by `service.name` and `team`, filtering out any log records that have a severity level of `info`.

---

### Custom Config to Copy

```yaml
apiVersion: mdai.mdai.ai/v1
kind: MdaiObserver
metadata:
  labels:
    app.kubernetes.io/name: mdai-operator
    app.kubernetes.io/managed-by: kustomize
  name: <your-observer-name>
spec:
  observers:
    - name: <your-observer-name>
      labelResourceAttributes:
        - <your-label-key>
      countMetricName: <your-metric-name-for-count>
      bytesMetricName: <your-metric-name-for-bytes>
      filter:
        error_mode: ignore
        logs:
          log_record:
            - '<your-filter-condition>'

  observerResource:
    image: <your-docker-image>
    replicas: <number-of-replicas>
    resources:
      limits:
        memory: "<memory-limit>"
        cpu: "<cpu-limit>"
      requests:
        memory: "<memory-request>"
        cpu: "<cpu-request>"
```