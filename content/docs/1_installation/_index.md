---
title: Installation
weight: 2
---

There are 2 ways to install the MDAI cluster locally.

- A quick installation script-based install gets the MDAI cluster up and running in minutes.
- A step-by-step install that let’s you see each of the components composing the MDAI cluster.

> [!NOTE]
> Instructions in our documentation are for *nix environments.

## Prerequisites

Before you install the MDAI cluster, you’ll need a GitHub account to access resources from MyDecisive repos.

You'll also need to install the following software.

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Kubernetes](https://kubernetes.io/releases/download/) (k8s)
- [kubectl and kind](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/)
- (Optional) [k9s](https://k9scli.io/topics/install/)

For the required MDAI cluster resources, clone the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs). This repo also contains the scripts resources needed for trying out the MyDecisive solutions.

Before you install the MDAI cluster, make sure Docker is running.

## Choose an Installation Method

This guide targets v{{< version format="semver" >}}.
Full: {{< version format="semver" >}}


<p>Short: <span data-global="docs_version" data-format="short"></span></p>
<p>Semver: <span data-global="docs_version" data-format="semver"></span></p>

{{< tabs items="Automatic Install, Guided Install" >}}

<!-- AUTOMATED -->
  {{< tab >}}
    {{< render_frag path="docs/1_installation/_fragments/{semver}/install_automated" >}}
  {{< /tab >}}

<!-- GUIDED -->
  {{< tab >}}
    {{< render_frag path="docs/1_installation/_fragments/{semver}/install_guided" >}}
  {{< /tab >}}

{{< /tabs >}}

## Explore MDAI Use Cases

When you're done installing the MDAI cluster, visit [Recipes List](../recipes) to explore available use cases.
