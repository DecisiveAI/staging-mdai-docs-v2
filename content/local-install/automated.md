+++
title = 'Automated Install'
weight = 25
+++

## Automated Install

A repository full of reference solutions for getting started with MDAI.

We've put together some pre-defined solutions and an **automated installation** in our [mdai-labs](https://github.com/DecisiveAI/mdai-labs/blob/main/README.md) repo. 

### Step 1: Clone mdai-labs:
**Clone [mdai-labs](https://github.com/DecisiveAI/mdai-labs/tree/main) repo and use as your working directory**

### Step 2: Run the following to make our install/uninstall script executable.
```sh
chmod +x mdai-kind.sh
```

### Step 3: Install Cluster

```sh
./mdai-kind.sh install
```

### Step 4: Apply AWS Credentials Secret 
>[!NOTE]
>Follow our [Setup IAM for AWS & MDAI Collector User Guide](../quickstart/setup_iam_longterm_user_s3) to get your AWS secrets.
```sh
./mdai-kind.sh aws_secret
```

### Step 5: Apply MDAI commands
1. Deploy Collector with Keys - Applies `mdai_monitor.yaml` with updated collector keys
    ```sh
    ./mdai-kind.sh mdai_monitor
    ```
2. Install MDAI Smart Hub - Applies the MDAI Smart Telemetry Hub manifest 
    ```sh
    ./mdai-kind.sh hub
    ```
3. Install Collector - Applies the OpenTelemetry Collector manifest 
    ```sh
    ./mdai-kind.sh collector
    ```
4. Forward Logs to MDAI via Fluentd - Installs Fluentd Helm chart with log forwarding config  
    ```sh
    ./mdai-kind.sh fluentd
    ```

### **Optional** MDAI Advanced Commands
- Install Compliance configs - Applies the MDAI Compliance manifest 
    ```sh
    ./mdai-kind.sh compliance
    ```

- Install Dynamic Filtration configs - Applies the MDAI Dynamic Filtering manifest 
    ```sh
    ./mdai-kind.sh df
    ```

- Install PII Redaction configs - Applies the MDAI PII manifests
    ```sh
    ./mdai-kind.sh pii
    ```

>[!WARNING]
>
>If you see the error **CreateContainerConfigError** with the `svc/mdai-s3-logs-reader-service`. This is due to a missing secret attached to this service that enable this service to write to S3. You can jump ahead to [MDAI collector install with s3 access](../quickstart/setup_iam_longterm_user_s3). Follow instructions from here through the rest of the installation flow.

### Step 6: Apply Data Generators - Deploys synthetic noisy and normal log services (DEMO)
```sh
./mdai-kind.sh logs
```

## Success!

---

### Automated Unistall Commands
- Delete Cluster - Deletes the MDAI cluster 
```sh
./mdai-kind.sh delete
```
- Uninstalls config deployments - Deletes all resources in the `mdai` namespace 
```sh
./mdai-kind.sh rm_configs
```