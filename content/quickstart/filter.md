+++
title = 'Filter Logs'
weight = 60
+++

![quick-start page navigation numbers highlighting number 6 filtering](../filter6.png)

Infrastructure produces a tremendous volume of log data that then gets monitored, transmitted, analyzed, and stored. The cost to manage logs, in both time and resources, can be significant. 

But not all logs are created equal. Now that we're generating log data, let's filter out unnecessary lines to reduce our volume. [Using Prometheus](dashboard.md), we found 2 very noisy services with log-data volumes we'd like to control. We can achieve that control using MDAI *managed filters*. These filters help our infrastructure monitor and react to data streams via configuration. 

## Add a Managed Filter

MDAI is monitoring services by a service identifier, `service.name`, and a tolerance threshold over a rolling time window. When a given service surpasses that threshold, we'd like to drop non-critical data such as log lines with a level below WARN.

To do that, let's add a managed filter to `otel_config.yaml`, the collector's configuration file. Open the file for editing and look for the configuration block that looks like this:

```
     filter/service_list:
         error_mode: ignore
         logs:
           log_record:
              - 'IsMatch(attributes["logger"], "${env:SERVICE_LIST_REGEX}")'
```

Now add this configuration just above that configuration block:

```
     filter/severity:
       error_mode: ignore
       logs:
         log_record:
            - 'attributes["level"] == "INFO"'
```

Apply the updated configuration:

```
kubectl apply -f otel_config.yaml --namespace mdai
```

## Confirm the Change in Log Volume

If the new filter is working, we should see a change in log volume. Go back to the [Prometheus expression dashboard](localhost:9090) to see what's happening with the services we're tracking. The graph should show a major change.

![Prometheus dashboard showing decline in volume for service4321](../dashboardFiltered.png)

The log volume for `service4321` has decreased so much that it's not visible at the scale shown. And if you keep watching the dashboard, you'll see that log volume for `service4321` isn't coming back. Let's review what this graph is telling us:

- We filtered out log lines that have the INFO log level and those make up the bulk of the `service4321` logs. Therefore we expect not to see that service in the graph any longer.
- `service1234` logs had much fewer INFO log lines, and it generated a substantial amount of log lines at the  WARNING and ERROR levels. Those levels are not being dropped. That's good, since `service1234` is letting us know that it needs attention!
- Other services had low volumes of logs, and shouldn't be visibly affected by the filter.

## Success

TODO: OVERALL REVIEW OF QUICK START AND USE-CASE VALUE
