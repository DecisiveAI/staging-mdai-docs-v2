---
title: Getting Started
weight: 1
tags:
  - Docs
  - Guide
next: /docs/guide
---

## How it works

MyDecisive solutions transform OpenTelemetry from a static configuration challenge into an intelligent, self-managing platform. These solutions run on our infrastructure, the MdaiHub, which utilizes industry-standard and proprietary open-source components.

<a href="/images/overview-auto.png" target="_blank" rel="noopener noreferrer">
  <img alt="MyDecisive Overview" src="/images/overview-auto.png">
</a>


## What to Expect

{{% steps %}}

### Identify a MyDecisive.ai use case or platform capability

MyDecisive.ai supports many use cases and platform capabilities. Once you identify them, you can start using our platform and see immediate results, whether it be cost saving or greater control over your telemetry pipelines.


### Install MyDecisive

Utilizing our [CLI-like](http://localhost:1313/docs/1_installation/#choose-an-installation-method) install and management script, you can get a local cluster with the `mdai` components up and running in a matter of minutes. If you don't like or trust our scripts, we have a [manual-install option](http://localhost:1313/docs/1_installation/#choose-an-installation-method) as well.


### Introduce OTel into your ecosystem

Connect your data sources to your data destinations using OpenTelemetry. Introducing OpenTelemetry enables a standardized data transfer protocol, `otlp`, and [other supported protocols](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver), that enables you to unify how you transmit and manage your telemetry streams.

### Use static OTel for your use case

OpenTelemetry has many static capabilities. We leverage OTel's ability to conform your telemetry to your business needs. This step will show you the super power of OTel.

### Use dynamic OTel using `mdai`

The MyDecisive Smart Telemetry Hub turns OTel from static to dynamic. By adding an `MdaiHub` to your kubernetes cluster, we can use insights derived from our components and the telemetry flowing through your OTel collector, to make smart, automated, rule-based decisions that afford you greater control over your streams.

### Show off the results to your team!

When you see the power of OTel using the `MdaiHub`, you'll want to adopt our platform in prod. We'll be here to support you in your self-service journey.

{{% /steps %}}

{{< cards cols="4" >}}
  {{< card link="/docs/1_installation" title="Install MDAI Locally" >}}
  {{< card link="/docs/2_recipes" title="Jump ahead to recipes" >}}
{{< /cards >}}