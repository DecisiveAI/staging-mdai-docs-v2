---
title: Dynamic Data Filtration
---

## Use case

Filter telemetry streams in real time using dynamic rules that adapt to services, environments, or cost constraints—without code changes or redeploys.

## Prerequisites

1. A k8s cluster where `mdai` can be installed
2. Clone the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs)

## Choose your preferred self-guided experience

{{< callout type="important" >}}
  For the required MDAI cluster resources, clone the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs). This repo also contains the scripts resources needed for trying out the MyDecisive solutions.
{{< /callout >}}

{{< tabs items="Automated, Manual" >}}
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
{{< /tabs >}}

----

{{< cards cols="4" >}}
  {{< card link="/docs/2_recipes" title="Discover more recipes" >}}
{{< /cards >}}
