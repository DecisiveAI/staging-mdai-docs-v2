Make sure you have installed our shell script [](http://localhost:1313/docs/1_installation/#use-mdaish-script-for-installation)

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