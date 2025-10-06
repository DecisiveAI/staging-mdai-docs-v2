---
title: Logs in context
---

## Use case

Correlate logs with traces and metrics so every drill-down is seamless—ensuring cohesive, always-available context in your observability platform of choice.

## Prerequisites

### 1. Consistent telemetry schema

Define and propagate common attributes (e.g., service.name, deployment.environment, trace_id, span_id) across traces, logs, and metrics.

### 2. Structured log format

Ensure logs are structured (e.g., JSON or key-value) so correlation fields (trace_id, span_id) can be parsed and indexed.

## Choose your preferred self-guided experience

{{< callout type="important" >}}
  For the required MDAI cluster resources, clone the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs). This repo also contains the scripts resources needed for trying out the MyDecisive solutions.
{{< /callout >}}

{{< tabs items="Automated, Manual" >}}
  {{< tab >}}

    {{< runtime_switcher
        base="docs/2_recipes/use_cases/logs_in_ctx/_fragments"
        choose="automated"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}
  {{< /tab >}}

  {{< tab >}}
    {{< runtime_switcher
        base="docs/2_recipes/use_cases/logs_in_ctx/_fragments"
        choose="manual"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}
  {{< /tab >}}
{{< /tabs >}}


## Advanced setup (Hungry for more?)

{{< cards cols="4" >}}
  {{< card link="/docs/recipes" title="Go back to recipes" >}}
{{< /cards >}}

