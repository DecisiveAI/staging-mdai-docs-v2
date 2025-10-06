---
title: Telemetry Store
weight: 1
---
## Use case

Enforce global governance policies for telemetry—covering compliance, retention, and access—across all pipelines and environments from a single control plane.

## Prerequisites

1. Policy distribution/control plane
1. RBAC & roles/approvals
1. Policy versioning & audit logs
1. Org-wide compliance/cost integration

## Choose your preferred self-guided experience

{{< callout type="important" >}}
For the required MDAI cluster resources, clone the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs). This repo also contains the scripts resources needed for trying out the MyDecisive solutions.
{{< /callout >}}

{{< tabs items="Automated, Manual" >}}
  {{< tab >}}
    {{< runtime_switcher
        base="docs/2_recipes/platform/telemetry_store/_fragments"
        choose="automated"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}
  {{< /tab >}}

  {{< tab >}}
    {{< runtime_switcher
        base="docs/2_recipes/platform/telemetry_store/_fragments"
        choose="manual"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}
  {{< /tab >}}
{{< /tabs >}}

##### Advanced setup (Hungry for more?)
Power up MDAI with these other relevant recipes
- [Relevant link to advanced]()
- [Maybe another relevant link to use case]()