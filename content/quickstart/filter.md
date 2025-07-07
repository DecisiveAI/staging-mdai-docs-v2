+++
title = 'Filter Logs'
weight = 60
+++


<div style="align-items: center; display: flex; justify-content: center;">
  <a href="/quickstart">
    <img src="../stepper/6.1.png" alt="Step 6.1 - Complete">
  </a>
  <a href="../install">
    <img src="../stepper/6.2.png" alt="Step 6.2 - Complete">
  </a>
  <a href="../pipelines">
    <img src="../stepper/6.3.png" alt="Step 6.3 - Complete">
  </a>
  <a href="../collect">
    <img src="../stepper/6.4.png" alt="Step 6.4 - Complete">
  </a>
  <a href="../dashboard">
    <img src="../stepper/6.5.png" alt="Step 6.5 - Complete">
  </a>
  <a href="#">
    <img src="../stepper/6.6.png" alt="Step 6.6 - Active">
  </a>
</div>

Infrastructure produces a tremendous volume of log data that then gets monitored, transmitted, analyzed, and stored. The cost to manage logs, in both time and resources, can be significant.

But not all logs are created equal. Now that we're generating log data, let's filter out unnecessary lines to reduce our volume. [Using Prometheus](dashboard.md), we found 2 very noisy services with log-data volumes we'd like to control. We can achieve that control using MDAI *managed filters*. These filters help our infrastructure monitor and react to data streams via configuration.

## Using a Managed Filter

MDAI is monitoring services by a service identifier (log attribute), `mdai_service`, and a tolerance threshold over a rolling time window. When a given service surpasses that threshold, we'd like to drop non-critical data such as log lines with a level below WARN.

To do that, let's add a managed filter to `./otel/otel_ref.yaml`, the collector's configuration file. Open the file for editing and look for the configuration block that looks like this:

```
    # filter/service_list:
    #   error_mode: ignore
    #   logs:
    #     log_record:
    #       - 'IsMatch(attributes["mdai_service"], "${env:SERVICE_LIST_REGEX}")'
```

Notice this block is currently commented out. Go ahead and uncomment it.


You will also need to uncomment the line in the following pipeline, filter processor instruction.

```
    logs/customer_pipeline:
        receivers: [ otlp, fluentforward ]
        processors: [
            # Uncomment the following line to start filtration
            # filter/service_list,  <---- UNCOMMENT THIS LINE
            # DO NOT CHANGE ORDER
            resource/observer_exporter_tag,
            groupbyattrs,
            memory_limiter,
            # DO NOT CHANGE ORDER
            # batch must be last in processor list
            batch
        ]
        exporters: [ debug, otlp/observer ]
```


Apply the updated configuration:

```
kubectl apply -f ./otel/otel_ref.yaml --namespace mdai
```

## Confirm the Change in Log Volume

If the new filter is working, we should see a change in log volume. Go back to the [Prometheus expression dashboard](localhost:9090) to see what's happening with the services we're tracking. The graph should show a major change.

![Prometheus dashboard showing decline in volume for service4321](../dashboardFiltered.png)

The log volume for `service4321` has decreased so much that it's not visible at the scale shown. And if you keep watching the dashboard, you'll see that log volume for `service4321` isn't coming back. Let's review what this graph is telling us:

- We filtered out log lines that have the INFO log level and those make up the bulk of the `service4321` logs. Therefore we expect not to see that service in the graph any longer.

- `service1234` logs had much fewer INFO log lines, and it generated a substantial amount of log lines at the  WARNING and ERROR levels. Those levels are not being dropped. That's good, since `service1234` is letting us know that it needs attention!

- Other services had low volumes of logs, and shouldn't be visibly affected by the filter.

## 🎉 Success

Thanks for sticking around. To emphasize the power of what you completed, let's recap what happened...

1. You setup a bare-bones cluster to install MDAI
2. You installed the MDAI helm repo (all MDAI dependencies)
3. You installed an instance of the MDAI Smart Telemetry H
4. You installed a few log generators that created synthetic data to simulate telemetry flow from your services/infra to MDAI
5. You setup an OTel collector for ETL + routing activities
6. You setup a log forwarder to capture the log streams from the log generators and forward on to your OTel collector
7. You applied a data filter in your OTel collector
8. You successfully filtered data -- which at the end of the day in a prod environment, would provide cost savings.
