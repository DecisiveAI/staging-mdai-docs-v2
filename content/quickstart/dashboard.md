+++
title = 'Set Up a Dashboard'
weight = 50
+++

Dashboards are an indispensable devops tool providing alerts, enhancing visibility, enabling analysis, and more.

We'll use Prometheus and Grafana, which were installed along with MDAI, to inspect the log data that's flowing through the pipeline we created. Prometheus is collecting and  aggregating the data, while Grafana allows us to visualize that data and create alerts in a dashboard.

## Port Forward Prometheus and Grafana

Port-forward Prometheus so you can connect to the Prometheus instance running on your local machine.

```
kubectl port-forward -n mdai svc/kube-prometheus-stack-prometheus 9090:9090
```

Do the same with Grafana.

```
kubectl port-forward -n mdai svc/mdai-grafana 3000:80
```


## Connect to the MDAI Grafana Dashboard

The [MDAI Data Monitoring Dashboard](http://localhost:3000/d/de978rcegwfswb/mdai-data-management?orgId=1&refresh=5s&from=now-5m&to=now) shows summaries of the log data flowing through our pipeline. Log in with the username `admin` and the password `mdai`. (You can also connect directly to the Grafana instance's home page using `localhost:3000`.)

TODO: SCREENSHOT



