+++
title = 'Create a Collector'
weight = 40
+++

<div style="align-items: center; display: flex; justify-content: center;">
  <a href="/quickstart">
    <img src="../stepper/4.1.png" alt="Step 4.1 - Complete">
  </a>
  <a href="../install">
    <img src="../stepper/4.2.png" alt="Step 4.2 - Complete">
  </a>
  <a href="../pipelines">
    <img src="../stepper/4.3.png" alt="Step 4.3 - Complete">
  </a>
  <a href="#">
    <img src="../stepper/4.4.png" alt="Step 4.4 - Active">
  </a>
  <a href="../dashboard">
    <img src="../stepper/4.5.png" alt="Step 4.5">
  </a>
  <a href="../filter">
    <img src="../stepper/4.6.png" alt="Step 4.6">
  </a>
</div>

An OpenTelemetry collector is a component that receives and forwards telemetry data.

## Set Up a Collector

1. From the [MDAI Example Config repo](https://github.com/DecisiveAI/configs/blob/main/otel_config.yaml), copy the `otel_config.yaml` into your working directory.


2. Deploy the Otel config to your cluster.

    ```
    kubectl apply -f otel_config.yaml
    ```

3. Verify that the collector is running in Kubernetes.

    ```
    kubectl -n mdai get pods --selector app.kubernetes.io/name=gateway-collector
    ```

    Output should be similar to the following.

    ```
    NAME                                 READY   STATUS    RESTARTS   AGE
    gateway-collector-74f69ccf5b-896gk   1/1     Running   0          2m28s
    ```

## Forward Logs

We'll use Fluentd to capture the synthetic log streams you created, and forward them to the collector.

1. From the [MDAI Example Config repo](https://github.com/DecisiveAI/configs/blob/main/synthetics/loggen_fluent_config.yaml), copy the `loggen_fluent_config.yaml` into your working directory.

    ```
    helm upgrade --install --repo https://fluent.github.io/helm-charts fluent fluentd -f loggen_fluent_config.yaml
    ```

2. Confirm that Fluentd is running in the default namespace.

     ```
     kubectl get pods
     ```

    This also gives you the name of the Fluentd pod.

3. Look at the Fluentd logs, which should indicate that various pod log files are being accessed.

    ```
     kubectl logs svc/fluent-fluentd
    ```

    You should see log lines similar to the following.

    ```
    2025-02-10 01:41:18 +0000 [info]: #0 following tail of /var/log/containers/mdai-prometheus-node-exporter-957tk_mdai_node-exporter-5b9ba8e8394e00b48b54534c075097cdc1bff99d2e634684d450645062a3a390.log
    2025-02-10 01:41:18 +0000 [info]: #0 following tail of /var/log/containers/mdai-prometheus-node-exporter-957tk_mdai_node-exporter-f6b7eacef004e60992050358d14a1e0780fa56c5cab236b66dcc4aa8debf7ecd.log
    2025-02-10 01:41:18 +0000 [info]: #0 following tail of /var/log/containers/noisy-mclogface-7ccd56984f-6wmrb_mdai_noisy-mclogface-c60bf1edeacfca17682f7bdb87213485ec4ec18571b334c5953ba74b25dda802.log
    2025-02-10 01:41:18 +0000 [info]: #0 following tail of /var/log/containers/noisy-mclogface-7ccd56984f-6wmrb_mdai_noisy-mclogface-c85adcb072728b92991a967a4e7503c88e4be5ce0e9d324e10cb56d67065a6fd.log
    2025-02-10 01:41:18 +0000 [info]: #0 following tail of /var/log/containers/noisy-mclogface-7ccd56984f-7x4qd_mdai_noisy-mclogface-3d159b3e51d63dae5686122bfa03e21fd3f5faf99ae5563b588bbaaeab50d2d1.log
    2025-02-10 01:41:18 +0000 [info]: #0 following tail of /var/log/containers/noisy-mclogface-7ccd56984f-7x4qd_mdai_noisy-mclogface-b343a4e7d4e995249a934119898368dc11a827a695fb8cb20309dbe67a50a7b9.log
    2025-02-10 01:41:18 +0000 [info]: #0 following tail of /var/log/containers/noisy-mclogface-7ccd56984f-fwnxk_mdai_noisy-mclogface-609ac69e83dd09e70948f3ad19439132246c2b4ee8072f7a21b845224b0aee00.log
    2025-02-10 01:41:18 +0000 [info]: #0 following tail of /var/log/containers/noisy-mclogface-7ccd56984f-fwnxk_mdai_noisy-mclogface-ff2407b2005ed2f2f00157840743748800c78078343846acdf0b8539518632d6.log
    2025-02-10 01:41:18 +0000 [info]: #0 following tail of /var/log/containers/opentelemetry-operator-57bd64b65d-mnf5d_mdai_manager-e1d482d5de3054b584edf8aee1501856d5fe0b61f3c80626c539c5435c48f7f3.log
    2025-02-10 01:41:18 +0000 [info]: #0 following tail of /var/log/containers/prometheus-kube-prometheus-stack-prometheus-0_mdai_config-reloader-3f50b71d40173e561f5c2110c9ec00241e2057768a4ec6f5267e88589efc6812.log
    ```

## Verify your OTel collector is receiving data

Now that Fluentd is set up, data should be flowing through the collector.

```
kubectl logs svc/gateway-collector --tail 10 -n mdai
```

You should see log lines similar to the following.

```
2025-04-18T04:08:18.983Z	info	Logs	{"kind": "exporter", "data_type": "logs", "name": "debug/storage", "resource logs": 1, "log records": 46}
2025-04-18T04:08:19.946Z	info	Logs	{"kind": "exporter", "data_type": "logs", "name": "debug/observer", "resource logs": 74, "log records": 2037}
2025-04-18T04:08:19.981Z	info	Logs	{"kind": "exporter", "data_type": "logs", "name": "debug/storage", "resource logs": 1, "log records": 45}
2025-04-18T04:08:20.980Z	info	Logs	{"kind": "exporter", "data_type": "logs", "name": "debug/storage", "resource logs": 1, "log records": 14}
2025-04-18T04:08:26.982Z	info	Logs	{"kind": "exporter", "data_type": "logs", "name": "debug/storage", "resource logs": 1, "log records": 25}
2025-04-18T04:08:27.980Z	info	Logs	{"kind": "exporter", "data_type": "logs", "name": "debug/storage", "resource logs": 1, "log records": 23}
2025-04-18T04:08:30.981Z	info	Logs	{"kind": "exporter", "data_type": "logs", "name": "debug/storage", "resource logs": 1, "log records": 40}
2025-04-18T04:08:31.425Z	info	Logs	{"kind": "exporter", "data_type": "logs", "name": "debug/observer", "resource logs": 139, "log records": 193}
2025-04-18T04:08:32.949Z	info	Logs	{"kind": "exporter", "data_type": "logs", "name": "debug/observer", "resource logs": 119, "log records": 2969}
2025-04-18T04:08:35.982Z	info	Logs	{"kind": "exporter", "data_type": "logs", "name": "debug/storage", "resource logs": 1, "log records": 55}
```

## Success

To view the log data flowing frm end to end, we'll [set up a dashboard](dashboard.md).
