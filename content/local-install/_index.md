+++
title = 'Quickstart with AWS or OTLP'
url = '/local-install/'
sectionPagesMenu = "local-install"
weight = 23
+++

Your options for installing MDAI using a remote destination for logs allows you to exlore the MDAI self-monitoring feature.

1. [MDAI Automated Install with Self-Monitoring via S3](automated)
2. [MDAI Manual Install with Self-Monitoring via S3](s3-self-monitoring)
3. [MDAI Manual Install with Self-Monitoring via OTLP Endpoint](otlp-endpoint-self-monitoring)

>**Read about [about self-monitoring](self_monitoring) with MDAI to understand the right choice for you.**

> [!INFO]
> If you don't want to use an external endpoint for logs with the MDAI quick start, see [**Quickstart**](quickstart.html).

## Install MDAI into your cluster

> [!IMPORTANT]
>
> All manual installation methods require the following steps first!

Make sure Docker is running.

1. Create a new cluster.

```
kind create cluster --name mdai
```

2. Install cert-manager.

```bash
  kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
  kubectl wait --for=condition=Established crd/certificates.cert-manager.io --timeout=60s
  kubectl wait --for=condition=Ready pod -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
  kubectl wait --for=condition=Available=True deploy -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=60s
```
  > [!NOTE]
  > Wait a few moments for cert-manager to finish installing.

## Success

Now that we have an MDAI cluster with cert-manager, we can go on to our recommended [MDAI Manual Install with Self-Monitoring via S3](s3-self-monitoring).
