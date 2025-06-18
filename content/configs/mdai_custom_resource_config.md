+++
title = 'MDAI Hub Custom Resource Sample Config'
weight = 20
+++



The **MDAI Hub Custom Resource** provides a declarative way to define **variables**, **observers**, **observer resources**, and **evaluations** within the **MDAI ecosystem**. It allows fine-grained control over telemetry processing and alerting.

### Table of Contents

- [MDAI Hub Custom Resource Sample Config](#mdai-hub-custom-resource-sample-config)
- [Link to Example Config](#link-to-example-config)
  - [Variables](#variables)
  - [Observer Resources](#observer-resources)
  - [Observers](#observers)
  - [Evaluations](#evaluations)
- [Custom Config to Copy](#custom-config-to-copy)

---
### Link to example config
[MDAI Hub Sample Config](https://github.com/DecisiveAI/mdai-labs/blob/main/mdai/hub/mdaihub_dynamic_filtration_config.yaml)

---

## Variables

The variables section describes variables available for injection into the configuration of components managed by the MDAI Operator, such as a managed OpenTelemetry collector.

### Variable Definition

| Variable        | Required | Description |
|----------------|----------|-------------|
| **`storageKey`** | ✅ **YES** | Unique identifier for the variable, used to refer to the variable in other sections of this configuration, including evaluations. |
| **`defaultValue`** | ✅ **YES** | The default value when no value has been assigned. |
| **`type`** | ❌ NO | The variable type. Available types: <br> - **`set`**: A set of unique string values. Requires at least one `with` configured, including a valid `transformer`. |
| **`storageType`** | ❌ NO | Defines the underlying storage used for variables. Defaults to `mdai-valkey` if not provided. Available types: <br> - **`mdai-valkey`**: A Valkey store deployed by the MDAI Helm chart, used by MDAI Operator & Event Handler. |
| **`with`** | ❌ NO | Describes how this variable is exported as an environment variable ConfigMap. Accepts an array of exported variable names and transformers. |
| **`exportedVariableName`** | ✅ **YES** | The environment variable name exported to the ConfigMap. |
| **`transformer`** | ❌ NO | Function applied to the run-time value of a variable. Available transformer: <br> - **`join`**: Requires a string `delimiter`. Can be applied to `set` type variables. |

**Example Configuration:**
```yaml
variables:
  - storageKey: service_list
    defaultValue: "n/a"
    type: set
    storageType: "mdai-valkey"
    with:
      - exportedVariableName: "SERVICE_LIST_REGEX"
        transformer:
          join:
            delimiter: "|"
      - exportedVariableName: "SERVICE_LIST_CSV"
        transformer:
          join:
            delimiter: ","
```

> ℹ️ In this example, we have defined a `service_list` variable that will be stored in the managed Valkey store as a set of unique strings. This set is made available as a ConfigMap of environment variables: `SERVICE_LIST_REGEX` expressed as a pipe-delimited string, and `SERVICE_LIST_CSV` as a comma-delimited string.

---

## ObserverResources

Observer Resources are used to run the observers defined below. These are services that receive telemetry via **GRPC (port 4317) or HTTP (port 4318)** and emit metrics to be scraped by **Prometheus**. This block tells the **MDAI Operator** how to provision these services, allowing them to scale with your collector fleet.

| Variable   | Required | Description |
|------------|----------|-------------|
| **`name`**  | ✅ **YES** | Unique name of this observer resource. |
| **`image`** | ✅ **YES** | Docker image for the observer resource. Recommended: `public.ecr.aws/decisiveai/watcher-collector:0.1` as it is pre-configured to work as an observer|
| **`replicas`** | ❌ NO (default: `1`) | The number of replicas for k8s to spin up for this watcher. We recommend matching the total number of replicas in your collector fleet that will be sending to these observer resources. |
| **`resources`** | ❌ NO | A standard kubernetes [resource definition](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits). We recommend matching the resources of your collector fleet. |

**Example Configuration:**
```yaml
observerResources:
  - name: watcher-collector
    image: public.ecr.aws/decisiveai/watcher-collector:0.1
    replicas: 3
    resources:
      limits:
        memory: "512Mi"
        cpu: "200m"
      requests:
        memory: "128Mi"
        cpu: "100m"
```

> ℹ️ In this example, we have defined a single observer resource that uses the watcher-collector image, with three replicas and set k8s resource limits.

---

## Observers

Observers are **MDAI Operator-managed components** that observe telemetry flowing through them and emit metrics based on that telemetry. Your **OpenTelemetry collector configuration** must export data to one or more of these observers for them to generate metrics.

| Variable   | Required | Description |
|------------|----------|-------------|
| **`name`** | ✅ **YES** | Unique name of the observer. |
| **`resourceRef`** | ✅ **YES** | Name of the [observer resource](#observerresources) this observer uses. |
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
    resourceRef: watcher-collector
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

## Evaluations

Evaluations are performed on **metrics emitted by Observers or system components** and trigger operations on **variables**.

| Variable | Required | Description |
|------------|----------|-------------|
| **`name`** | ✅ **YES** | The name of this evaluation. |
| **`type`** | ✅ **YES** | The type of evaluation. Currently supported: <br> - `mdai/prometheus_alert`: A Prometheus alert in the MDAI-managed Prometheus installation. |
| **`expr`** | ❌ NO | The Prometheus query to execute. |
| **`for`** | ❌ NO | How long the `expr` must return a value before the alert fires. |
| **`keep_firing_for`** | ❌ NO | Minimum amount of time the alert remains in a firing state before resolving. |
| **`severity`** | ❌ NO | The severity level of the alert. |
| **`onStatus`** | ❌ NO | Operations to execute when an alert enters a `firing` or `resolved` state. |
| **`firing` / `resolved`** | ❌ NO | Defines what happens when the alert is triggered or resolved. |
| **`variableRef`** | ❌ NO | The [variable](#variables) that will be updated when the alert status changes. |
| **`operation`** | ❌ NO | The operation performed on a variable. Available operations: <br> - `mdai/add_element`: Adds `relevantLabels` values to the set variable. <br> - `mdai/remove_element`: Removes `relevantLabels` values from the set variable. |
| **`relevantLabels`** | ❌ NO | Labels of telemetry data used in `onStatus` operations. |

**Example Configuration:**
```yaml
evaluations:
  - name: top_talkers
    type: mdai/prometheus_alert
    expr: 'increase(bytes_received_by_service_total{service_name!=""}[1h]) > 5*1024*1024'
    severity: warning
    onStatus:
      firing:
        variableUpdate:
          variableRef: service_list
          operation: mdai/add_element
      resolved:
        variableUpdate:
          variableRef: service_list
          operation: mdai/remove_element
    # Optional below here
    for: 1m
    keep_firing_for: 10m
    relevantLabels:
      - "service_name"
```

> ℹ️ In this example, our evaluation will set up a Prometheus alert that executes a query looking for any `bytes_received_by_service_total` by `service_name` that exceeds 5MB in the past hour. When the alert fires, the `service_name` will be added to the `service_list` variable. When the alert resolves, the `service_name` will be removed from the list.

---

### Custom Config to Copy

```yaml
apiVersion: mdai.mdai.ai/v1
kind: MdaiHub
metadata:
  labels:
    app.kubernetes.io/name: mdai-operator
    app.kubernetes.io/managed-by: kustomize
  name: <your-mdaihub-name>
spec:
  variables:
    - storageKey: <your-variable-name>
      defaultValue: <default-value>
      with:
        - exportedVariableName: <your-exported-env-variable>
          transformer:
            join:
              delimiter: <your-delimiter>
      type: <set or other>
      storageType: <mdai-valkey or other>

  evaluations:
    - name: <your-evaluation-name>
      type: mdai/prometheus_alert
      expr: '<your-prometheus-query>'
      severity: <warning | critical | info>
      onStatus:
        firing:
          variableUpdate:
            variableRef: <your-variable-ref>
            operation: <mdai/add_element or mdai/remove_element>
        resolved:
          variableUpdate:
            variableRef: <your-variable-ref>
            operation: <mdai/add_element or mdai/remove_element>
      for: <time-duration>
      keep_firing_for: <time-duration>
      relevantLabels:
        - "<your-label-key>"

  observers:
    - name: <your-observer-name>
      resourceRef: <your-observer-resource-ref>
      labelResourceAttributes:
        - <your-label-key>
      countMetricName: <your-metric-name-for-count>
      bytesMetricName: <your-metric-name-for-bytes>
      filter:
        error_mode: ignore
        logs:
          log_record:
            - '<your-filter-condition>'

  observerResources:
    - name: <your-resource-name>
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