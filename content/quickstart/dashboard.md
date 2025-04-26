+++
title = 'Set Up a Dashboard'
weight = 50
+++

![quick-start page navigation numbers highlighting number 5 dashboard](../dashboard5.png)

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


## Connect to Grafana

The [MDAI Grafana dashboards](http://localhost:3000/dashboards) shows summaries of cluster usage, runtime metrics, and more. Log in with the username `admin` and the password `mdai`. 

TODO: SCREENSHOT

## Connect to the Prometheus Dashboard

Use the [Prometheus expression dashboard][localhost:9090) dashboard to run queries against the data you're collecting.

You can use [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/) to query the data flowing through the pipeline we created. For example, run the following query to see the amount of logs that each of the synthetic services is sending.

![Prometheus dashboard showing Promql query](../promql.png)

Notice that the volumes of services `service4321` and `service1234` are well above the others. To see that more clearly, scroll down to show the list of services below the chart, then click one of the other services (for example, `service1`).

![Prometheus dashboard showing PromQL query filtered to service 1](../promql_service1.png)

Notice that the change in scale on the graph is in orders of magnitude.

## Success

Now that we've found 2 very noisy services, our next task is to apply a filter to [remove the noise](filter.md).
