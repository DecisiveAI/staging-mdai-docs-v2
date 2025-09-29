---
title: Dynamic Data Filtration
---

#### Use case

Filter telemetry streams in real time using dynamic rules that adapt to services, environments, or cost constraints—without code changes or redeploys.

#### Prerequisites

1. A k8s cluster where `mdai` can be installed
2. OTel collector to apply your filter rules to
3. Drop vs. forward monitoring tool

#### Choose your preferred installation method


{{< tabs items="Guided, Automated" >}}

  {{< tab >}}
    {{< render_frag path="docs/2_recipes/use_cases/data_filtration/_fragments/ddf_guided" >}}
  {{< /tab >}}

  {{< tab >}}
    {{< render_frag path="docs/2_recipes/use_cases/data_filtration/_fragments/ddf_automated" >}}
  {{< /tab >}}

{{< /tabs >}}


##### Advanced setup (Hungry for more?)

{{< cards cols="4" >}}
  {{< card link="/docs/2_recipes/use_cases/data_filtration/advanced" title="Relevant link to advanced" >}}
  {{< card link="/docs/recipes" title="Go back to recipes" >}}
{{< /cards >}}

