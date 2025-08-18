---
title: Installation
weight: 2
---

MyDecisive solutions transform OTel from a static configuration challenge into an intelligent, self-managing platform. Solutions run on infrastructure called the MDAI cluster. The MDAI cluster includes both industry-standard components and the MDAI hub.

You can set up the MDAI cluster and test drive MyDecisive observability solutions on your laptop. Even with a local install, you’ll be able to demonstrate the ease and power of the MDAI cluster and try out different solutions. Alternatively, you can install the MDAI cluster on AWS to more closely simulate a production environment and use your own data.

Once completing the installation, you'll use the provided recipes to install and test MyDecisive solutions.

## Install MDAI

There are 2 ways to install the MDAI cluster locally.

- A quick installation script-based install gets the MDAI cluster up and running in minutes.
- A step-by-step install that let’s you see each of the components composing the MDAI cluster.

## Choose an Installation Method



{{< tabs items="Automatic install, Guided install" >}}

<!-- Tab A -->
  {{< tab >}}

  #### Automatic install

    <p class="mdai-description-text">If you are on macOS or Linux, you can use the automated downloader which will fetch the latest release version for you and install it:</p>

    ```bash
    chmod +x mdai-kind.sh
    ```

    <p class="mdai-description-text">You can use the following commands to setup and install your MDAI instance locally:</p>

    ```bash
    ./mdai-kind.sh preflight_deps_check
    ./mdai-kind.sh install
    ```
  {{< /tab >}}

<!-- Tab B -->
  {{< tab >}}

#### Guided install

AWAITING CONTENT

  {{< /tab >}}
{{< /tabs >}}

##### Things you can do next
- [Set up dashboards for MDAI monitoring](/docs/recipes)
- [Automate dynamic filtration]() 
- [Share your goals (Go to recipe)](/docs/dashboard)
