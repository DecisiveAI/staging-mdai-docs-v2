Run the following to make our install/uninstall script executable.

```
chmod +x mdai.sh
```

### Provision resources

You can use the following commands to setup and install your mdai instance locally...

```
./mdai.sh compliance --otel ./otel/otel_compliance.yaml --hub ./mdai/hub/hub_compliance.yaml
```

### Connect your data streams

1. Generate mock data

```
./mdai.sh logs
```

2. See data flowing through to the otel_collector

```
./mdai.sh hub
```

```
./mdai.sh collector
```

```
./mdai.sh fluentd
```