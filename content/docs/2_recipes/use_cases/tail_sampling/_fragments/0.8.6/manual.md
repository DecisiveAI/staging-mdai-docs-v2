
### Install Log Generators

#### 1. Initiate super noisy logs
```sh
kubectl apply -f ./synthetics/loggen_service_xtra_noisy.yaml
```

#### 2. Initiate semi-noisy logs
```sh
kubectl apply -f ./synthetics/loggen_service_noisy.yaml
```

#### 3. Initiate normal log flow
```sh
kubectl apply -f ./synthetics/loggen_services.yaml
```

### Create + Install MDAI Hub

> Get your Slack wehbook URL and update the `hub_ref.yaml` [here](https://github.com/DecisiveAI/mdai-labs/blob/00b05e9589d53b6cfac3361c4605b38f41b702a3/mdai/hub/0.8.5/hub_ref.yaml#L88-L109) to receive Slack messages. Follow [this guide](https://api.slack.com/messaging/webhooks) to get a webhook URL.

```sh
kubectl apply -f ./mdai/hub/0.8.5/hub_ref.yaml -n mdai
```
```sh
kubectl apply -f ./mdai/collector/0.8.5/collector_ref.yaml -n mdai
```
```sh
kubectl apply -f ./mdai/observer/0.8.5/observer_ref.yaml -n mdai
```

### Create + Install collector

```sh
kubectl apply -f ./otel/otel_log_severity_counts.yaml -n mdai
```

### Configure prometheus to scrape error log counts from collector

```sh
kubectl apply -f ./prometheus/scrape_collector_count_metrics.yaml -n mdai
```

### Fwd logs from the loggen services to MDAI
```sh
helm upgrade --install --repo https://fluent.github.io/helm-charts fluent fluentd -f ./synthetics/loggen_fluent_config.yaml
```

### What do to after manual install?

Jump to our docs to see how to use mdai to:
1. [setup dashboards for mdai monitoring](https://docs.mydecisive.ai/quickstart/dashboard/index.html)
2. [automate dynamic filtration](https://docs.mydecisive.ai/quickstart/filter/index.html)

## Appendix: how to make error conditions happen for testing