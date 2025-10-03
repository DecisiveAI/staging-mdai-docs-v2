### Use `mdai.sh` script for installation

Run to make this file executable

```bash
chmod +x ./cli/mdai.sh
```

### Add an `mdai` alias

**Recommended!**  You can create an alias in you `.bashrc`, `.zshrc`, or equivalent to run the command line. We will be using `mdai` to refer to the `./mdai/cli` script in these docs.

In your `.bashrc` (or equivalent), add this to EOF

```
alias mdai="cd ~/path/to/mdai-labs && ./cli/mdai.sh"
```

You can now call `mdai` from your terminal and use it like you would any other CLI.

```
<!– mdai alias –>
mdai <command> [command flags]

<!-- alternative without alias -->
./cli/mdai.sh <command> [command flags]
````


### Install `mdai`

Run the script to install your local MDAI cluster.

#### I need a local k8s cluster with k8s

{{% details title="Option 1: Install `mdai` with cert-manager" %}}

  ```bash
  mdai install --version 0.8.6
  ```

{{% /details %}}


{{% details title="**Option 2: Install `mdai` without cert-manager**" closed="true" %}}

  mdai --no-cert-manager install --version 0.8.6

{{% /details %}}


#### I have a local k8s cluster


{{% details title="**Option 1: Install `mdai` with cert-manager**" %}}

  {{< callout type="warning" >}}
    For this to work, your existing cluster must have `cert-manager` installed.
  {{< /callout >}}

  ```bash
  mdai install_mdai --version 0.8.6
  ```

{{% /details %}}


{{% details title="**Option 2: Install `mdai` without cert-manager**" closed="true" %}}

  ```bash
  mdai --no-cert-manager install_mdai --version 0.8.6
  ```

{{% /details %}}


You'll see a number of messages as cluster components are installed.
