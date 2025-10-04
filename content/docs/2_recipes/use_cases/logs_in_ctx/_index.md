---
title: Logs in context
---

#### Use case

Correlate logs with traces and metrics so every drill-down is seamless—ensuring cohesive, always-available context in your observability platform of choice.

#### Prerequisites

##### 1. Consistent telemetry schema

Define and propagate common attributes (e.g., service.name, deployment.environment, trace_id, span_id) across traces, logs, and metrics.

##### 2. Structured log format

Ensure logs are structured (e.g., JSON or key-value) so correlation fields (trace_id, span_id) can be parsed and indexed.


<!-- Replace image when content available -->
![landscape](/images/nothing_to_see_here.png)

## Advanced setup (Hungry for more?)

{{< cards cols="4" >}}
  {{< card link="/docs/2_recipes/use_cases/data_filtration/advanced" title="Relevant link to advanced" >}}
  {{< card link="/docs/recipes" title="Go back to recipes" >}}
{{< /cards >}}

