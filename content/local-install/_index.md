+++
title = 'Install Locally'
url = '/local-install/'
sectionPagesMenu = "local-install"
weight = 23
+++

## Your options for MDAI Installation

1. [MDAI Automated Install with Self-Monitoring via S3](automated)
2. [MDAI Manual Install with Self-Monitoring via S3](s3-self-monitoring)
3. [MDAI Manual Install with Self-Monitoring via OTLP Endpoint](otlp-endpoint-self-monitoring)
4. [MDAI Manual Install without Self-Monitoring](without-self-monitoring)

>**Read about [about self-monitoring](self_monitoring) with MDAI to understand the right choice for you.**

> [!INFO]
> If this is your first time here, we encourage you to run through our [**Quickstart**](quickstart.html)!

# Install MDAI into your cluster

> [!IMPORTANT]
>
> All manual installation methods require the following steps first!

Make sure Docker is running.

## Step 1. Create kind cluster

Use kind to create a new cluster.

```
kind create cluster --name mdai
```

## Step 2. Install cert-manager

```bash
  kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
  kubectl wait --for=condition=Established crd/certificates.cert-manager.io --timeout=60s
  kubectl wait --for=condition=Ready pod -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
  kubectl wait --for=condition=Available=True deploy -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
```
  > [!NOTE]
  > Wait a few moments for cert-manager to finish installing.

## Success

Now that we have a mdai cluster with cert-manager, we can go on to our recommended [MDAI Manual Install with Self-Monitoring via S3](./local-install/s3-self-monitoring.html).