+++
title = 'Filter Logs'
weight = 60
+++

![quick-start page navigation numbers highlighting number 6 filtering](../filter6.png)

Infrastructure produces a tremendous volume of log data that then gets monitored, transmitted, analyzed, and stored. The cost to manage logs, in both time and resources, can be significant. 

But not all logs are created equal. Now that we're generating log data, let's filter out unnecessary lines to reduce our volume. [Using Prometheus](dashboard.md), we found 2 very noisy services with log-data volumes we'd like to control. We can achieve that control using MDAI *managed filters*. These filters help our infrastructure monitor and react to data streams via configuration. 

## Modify a Filter

MDAI is monitoring services by a service identifier, `service.name`, and a tolerance threshold over a rolling time window. When a given service surpasses that threshold, we'd like to drop non-critical data such as log lines with a level below WARN.

TODO: CHANGE CONFIG AND VERIFY FILTERING
