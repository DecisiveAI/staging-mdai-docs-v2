---
title: Compliance
---

#### Use case

Guarantee regulatory compliance by forking every telemetry stream—no matter where the data is routed, filtered, or sampled—and persisting a full, unmodified copy into long-term cold or glacial storage for audit and retention needs.

#### Prerequisites

1. Long-term storage backend (cold/glacial tiers)
1. Fork/tee in pipeline
1. Policy/config to duplicate all streams
1. IAM & encryption keys

## Choose your preferred self-guided experience

{{< callout type="important" >}}
For the required MDAI cluster resources, clone the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs). This repo also contains the scripts resources needed for trying out the MyDecisive solutions.
{{< /callout >}}

{{< tabs items="Automated, Manual" >}}
  {{< tab >}}
    {{< runtime_switcher
        base="docs/2_recipes/use_cases/compliance/_fragments"
        choose="automated"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}
  {{< /tab >}}

  {{< tab >}}
    {{< runtime_switcher
        base="docs/2_recipes/use_cases/compliance/_fragments"
        choose="manual"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}
  {{< /tab >}}
{{< /tabs >}}

## Get data flowing using Otel

### Provision use case resources

### Start generating data

### Connect your data stream

### Validate dataflow with prometheus


## Advanced setup (Hungry for more?)

{{< cards cols="4" >}}
  {{< card link="/docs/2_recipes/use_cases/data_filtration/advanced" title="Relevant link to advanced" >}}
  {{< card link="/docs/recipes" title="Go back to recipes" >}}
{{< /cards >}}

