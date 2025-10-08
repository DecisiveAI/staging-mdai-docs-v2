---
title: Installation
weight: 2
versions: ["0.8.5","0.8.6","0.9.0"]
default_version: "0.8.6"
base: "docs/1_installation/_fragments"
---

There are 2 ways to install the MDAI cluster locally.

- A quick, cli-based install gets the MDAI cluster up and running in minutes.
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

{{< callout type="important" >}}

  1. For the required MDAI cluster resources, clone the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs). This repo also contains the scripts resources needed for trying out the MyDecisive solutions.

      ```bash
      git clone https://github.com/DecisiveAI/mdai-labs.git
      ```

  2. Before you install the MDAI cluster, **make sure Docker is running.**

{{< /callout >}}

## Choose an Installation Method


{{< tabs items="Automatic, Manual" >}}
  {{< tab >}}

    {{< runtime_switcher
        base="docs/1_installation/_fragments"
        choose="automated"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}

  {{< /tab >}}

  {{< tab >}}
    {{< runtime_switcher
        base="docs/1_installation/_fragments"
        choose="manual"
        keymap=`{
          "0.9.0": "0.9.0",
          "0.8.6": "0.8.6"
        }`
    >}}
  {{< /tab >}}
{{< /tabs >}}


## Explore MDAI Use Cases

When you're done installing the MDAI cluster, visit [Recipes List](/docs/2_recipes) to explore available use cases.

{{< cards cols="4" >}}
  {{< card link="/docs/2_recipes" title="Explore recipes" >}}

  <a class="hextra-card hx:group hx:flex hx:flex-col hx:justify-start hx:overflow-hidden hx:rounded-lg hx:border hx:border-gray-200 hx:text-current hx:no-underline hx:dark:shadow-none hx:hover:shadow-gray-100 hx:dark:hover:shadow-none hx:shadow-gray-100 hx:active:shadow-sm hx:active:shadow-gray-200 hx:transition-all hx:duration-200 hx:hover:border-gray-300 hx:bg-transparent hx:shadow-xs hx:dark:border-neutral-800 hx:hover:bg-slate-50 hx:hover:shadow-md hx:dark:hover:border-neutral-700 hx:dark:hover:bg-neutral-900" href="/docs/3_support" target="_blank" rel="noreferrer">
    <span class="hextra-card-icon hx:flex hx:font-semibold hx:items-start hx:gap-2 hx:p-4 hx:text-gray-700 hx:hover:text-gray-900 hx:dark:text-neutral-200 hx:dark:hover:text-neutral-50">
      Get support
    </span>
  </a>
{{< /cards >}}