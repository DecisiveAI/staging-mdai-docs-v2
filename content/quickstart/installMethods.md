# MDAI Install Methods

Read about [self-monitoring](self_monitoring.md) with MDAI to understand the right choice for you. We highly recommend choosing self-monitoring.

There are two options:
1. [Manual](#option-1-manual) - Add keys manually to a secret deployment
2. [Programatically (recommended)](#option-2-programatically-recommended) - Add keys and deploy secret via a script

##### MDAI Collector with Self-Monitoring

**Install MDAI Collector **

```sh
helm upgrade --install --create-namespace --namespace mdai --cleanup-on-fail --wait-for-jobs mdai mdai/mdai-hub --version v0.8.0-dev
```

> [!NOTE]
> If running this command returns an error telling you to run `helm repo update`, then try again.
