Run the following to make our install/uninstall script executable.

```
chmod +x mdai.sh
```

### Provision resources

You can use the following commands to setup and install your mdai instance locally...

```
mdai compliance --version 0.8.6
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