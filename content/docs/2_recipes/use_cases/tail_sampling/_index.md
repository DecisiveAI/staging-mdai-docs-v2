---
title: Dynamic Tail Sampling
---

## Use case

Control data volume and fidelity with tail-based sampling rules that adapt to traffic patterns and business context—ensuring high-value traces are kept while reducing noise.

## Prerequisites

1. OTel collector for centralizing trace spans
1. OTel collector to apply your sampling policies to (by service/error/latency/user)
1. Sample in/out monitoring tool

## Choose your preferred self-guided experience

{{< callout type="important" >}}
  For the required MDAI cluster resources, clone the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs). This repo also contains the scripts resources needed for trying out the MyDecisive solutions.
{{< /callout >}}

{{< tabs items="Automated, Manual" >}}
  {{< tab >}}

    {{< runtime_switcher
        base="docs/2_recipes/use_cases/data_filtration/_fragments"
        choose="manual"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}
  {{< /tab >}}

  {{< tab >}}
    {{< runtime_switcher
        base="docs/2_recipes/use_cases/data_filtration/_fragments"
        choose="automated"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}
  {{< /tab >}}
{{< /tabs >}}


## Advanced setup (Hungry for more?)

{{< cards cols="4" >}}
  {{< card link="/docs/2_recipes/use_cases/data_filtration/advanced" title="Relevant link to advanced" >}}
  {{< card link="/docs/recipes" title="Go back to recipes" >}}
{{< /cards >}}

