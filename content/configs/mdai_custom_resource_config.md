+++
title = 'MDAI Hub Custom Resource Sample Config'
weight = 20
+++



The **MDAI Hub Custom Resource** provides a declarative way to define **variables**, **prometheus alerts**, and **automations** within the **MDAI ecosystem**. It allows fine-grained control over telemetry processing and alerting.

### Table of Contents

- [Variables](#variables)
  - [Variable Definition](#variable-definition)
- [Prometheus Alert](#prometheus-alert)
- [Automations](#automations)
  - [Custom Config to Copy](#custom-config-to-copy)


---
### Link to example config
[MDAI Hub Sample Config](https://github.com/DecisiveAI/configs/blob/main/mdai_v1_mdaihub_sample_config_0_6_0.yaml)

---

## Variables

The variables section describes variables available for injection into the configuration of components managed by the MDAI Operator, such as a managed OpenTelemetry collector.

### Variable Definition

| Variable                       | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|--------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`key`**                      | ✅ **YES** | Unique identifier for the variable, used to refer to the variable in other sections of this configuration, including automations.                                                                                                                                                                                                                                                                                                                          |
| **`type`**                     | ❌ NO | The variable type. Available types: <br> - **`computed`**(default): variable type that is computed internally by MDAI, attached to an automation   <br> - **`manual`**: variable type that is managed externally by the user, not attached to any OODA loop <br> - **`meta`**: variable type that is derived from manual and computed variables                                                                                                            |
| **`dataType`**                 | ✅ **YES**  | The variable data type. Available types: <br> - **`set`**: A set of unique string values. Requires at least one `serializeAs` configured, including a valid `transformer`. <br> - **`int`**: an integer data type, no transformation is required <br> - **`float`**: an float data type, no transformation is required <br> - **`boolean`**: true or false <br> - **`string`**: <br> - **`map`**: <br> - **`metaHashSet`**: <br> - **`metaPriorityList`**: |
| **`storageType`**              | ❌ NO | Defines the underlying storage used for variables. Defaults to `mdai-valkey` if not provided. Available types: <br> - **`mdai-valkey`**: A Valkey store deployed by the MDAI Helm chart, used by MDAI Operator & Event Handler.                                                                                                                                                                                                                            |
| **`serializeAs`**              | ✅ **YES** | Describes how this variable is exported as an environment variable ConfigMap. Accepts an array of exported variable names and transformers.                                                                                                                                                                                                                                                                                                                |
| **`serializeAs/name`**         | ✅ **YES** | The environment variable name exported to the ConfigMap.                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`serializeAs/transformers`** | ❌ NO | Functions applied to the run-time value of a variable. Available transformer: <br> - **`join`**: Requires a string `delimiter`. Can be applied to `set` type variables.                                                                                                                                                                                                                                                                                    |

**Example Configuration:**
```yaml
variables:
  - key: service_list
    dataType: set
    storageType: "mdai-valkey"
    serializeAs:
      - name: "SERVICE_LIST_REGEX"
        transformers:
          - type: join
            join:
              delimiter: "|"
      - name: "SERVICE_LIST_CSV"
        transformers:
          - type: join
            join:
              delimiter: ","
```

> ℹ️ In this example, we have defined a `service_list` variable that will be stored in the managed Valkey store as a set of unique strings. This set is made available as a ConfigMap of environment variables: `SERVICE_LIST_REGEX` expressed as a pipe-delimited string, and `SERVICE_LIST_CSV` as a comma-delimited string.

---

# Prometheus Alert
Configuration of Prometheus alerts setup used in MDAI automation.

| Variable | Required | Description                                                                                   |
|------------|----------|-----------------------------------------------------------------------------------------------|
| **`name`** | ✅ **YES** | The name of this alert.                                                                       |
| **`expr`** | ✅ **YES** | The Prometheus query to execute.                                                              |
| **`for`** | ❌ NO | How long the `expr` must return a value before the alert fires.                               |
| **`keep_firing_for`** | ❌ NO | Minimum amount of time the alert remains in a firing state before resolving.                  |
| **`severity`** | ✅ **YES** | The severity level of the alert. Available values: <br> - **`warning`** <br> - **`critical`** |

**Example Configuration:**
```yaml
  prometheusAlert:
    - name: top_talkers
      expr: 'increase(bytes_received_by_service_total{service_name!=""}[1h]) > 5*1024*1024'
      severity: warning
      for: 1m
      keep_firing_for: 1m
```

## Automations

Automations are performed on **metrics emitted by Observers or system components** and trigger operations on **variables**.

| Variable | Required | Description                                                                                                                                                                                                                    |
|------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`eventRef`** | ✅ **YES** | The name of event this automation is set for.                                                                                                                                                                                  |
| **`workflow`** | ✅ **YES** | The workflow definition which consists of one or more steps.                                                                                                                                                                   |

**Example Configuration:**
```yaml
automations:
  automations:
    - eventRef: logBytesOutTooHighBySvc
      workflow:
        - handlerRef: HandleAddNoisyServiceToSet
          args:
            payload_val_ref: service_name
            variable_ref: service_list
```

> ℹ️ More details is coming.

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
  prometheusAlert:
    - name: <your-alert-name>
      expr: '<your-prometheus-query>'
      severity: <warning | critical>
      for: 1m
      keep_firing_for: 1m

  automations:
    - eventRef: <your-event-name>
      workflow:
        - handlerRef: <your-handler-name>
          args:
            payload_val_ref: <your-alert-label-name>
            variable_ref: <your-variable-name>
```