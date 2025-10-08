To automatically install the latest version of MDAI, use the `mdai-kind.sh` script available in the root directory of the [mdai-labs GitHub repo](https://github.com/DecisiveAI/mdai-labs) that you cloned. Make sure the script is executable>

```bash
chmod +x mdai.sh
```

Run the script to install your local MDAI cluster:

```bash
./mdai.sh \
    --chart-ref oci://ghcr.io/decisiveai/mdai-hub \
    --chart-version v0.8.5 \
    upgrade
```

You'll see a number of messages as cluster components are installed.
