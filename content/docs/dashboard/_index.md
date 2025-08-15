---
linkTitle: Dashboard
title: Set up dashboard
weight: 4
---

#### Before you set up dashboard, make sure you have:
- MDAI setup on a cluster
- Data flowing through MDAI Hub

#### Port Forward Prometheus and Grafana

<p class="mdai-description-text">Port-forward Prometheus so you can connect to the Prometheus instance running on your local machine.</p>

```bash
kubectl port-forward -n mdai svc/kube-prometheus-stack-prometheus 9090:9090
```

<p class="mdai-description-text">Do the same with Grafana</p>

```bash
kubectl port-forward -n mdai svc/mdai-grafana 3000:80
```

<!-- Replace image when content available -->
![landscape](/images/nothing_to_see_here.png)

