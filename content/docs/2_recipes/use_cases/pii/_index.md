---
title: PII Redaction
---

## Use case

Protect sensitive data by applying programmable redaction rules to strip personally identifiable information (PII) from telemetry streams before it leaves your boundary.

## Prerequisites

1. OTel collector for pii scrubbing
1. Policy definitions for what constitutes PII (regex, field names, JSON paths, etc.)
1. Ensure your redaction rules align with regulations (GDPR, HIPAA, etc.)
1. Unit & integration tests to validate redaction

## Choose your preferred self-guided experience

{{< callout type="important" >}}
  For the required MDAI cluster resources, clone the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs). This repo also contains the scripts resources needed for trying out the MyDecisive solutions.
{{< /callout >}}

{{< tabs items="Automated, Manual" >}}
  {{< tab >}}

    {{< runtime_switcher
        base="docs/2_recipes/use_cases/pii/_fragments"
        choose="manual"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}
  {{< /tab >}}

  {{< tab >}}
    {{< runtime_switcher
        base="docs/2_recipes/use_cases/pii/_fragments"
        choose="automated"
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
