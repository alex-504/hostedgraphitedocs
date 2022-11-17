.. index:: Snap_k8s for Kubernetes

Snap_k8s for Kubernetes
=======================

`Snap_k8s <https://github.com/grafana/snap_k8s>`_ is a Daemon used for monitoring Kubernetes nodes. The Docker image on the manifest is designed to be deployed into Kubernetes as a `DaemonSet <https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/>`_, causing it to run on every node in the cluster and returning useful performance statistics to a Graphite output.


Configuration
-------------

- Make sure your `kubectl command line <https://kubernetes.io/docs/tasks/tools/>`_ is configured to the context/cluster that you wish to monitor. Using AWS as an example, you would configure a context using this command: ``kubectl config use-context arn:aws:eks:<region>:<account-id>:cluster/<cluster-name>`` 

- Confirm you are on the correct context with this command: ``kubectl config get-contexts`` and if you need help, you can read more about this in the `AWS kubeconfig docs <https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html>`_.

- Create a file with the .yml extension. In this example, we are naming the file **snap_ds.yml**. Copy/paste the following code-block into the new file:

.. code-block:: none

    apiVersion: apps/v1
    kind: DaemonSet
    metadata:
     name: snap
    spec:
     selector:
       matchLabels:
         name: snap
     template:
       metadata:
         name: snap
         labels:
           name: snap
       spec:
         hostPID: true
         hostNetwork: true
         containers:
         - name: snap
           image: raintank/snap_k8s:v4
           volumeMounts:
             - mountPath: /sys/fs/cgroup
               name: cgroup
             - mountPath: /var/run/docker.sock
               name: docker-sock
             - mountPath: /var/lib/docker
               name: fs-stats
             - mountPath: /usr/local/bin/docker
               name: docker
             - mountPath: /proc_host
               name: proc
             - mountPath: /opt/snap/tasks
               name: snap-tasks
           ports:
           - containerPort: 8181
             hostPort: 8181
             name: snap-api
           imagePullPolicy: IfNotPresent
           securityContext:
             privileged: true
           env:
             - name: PROCFS_MOUNT
               value: /proc_host
         volumes:
           - name: dev
             hostPath:
               path: /dev
           - name: cgroup
             hostPath:
               path: /sys/fs/cgroup
           - name: docker-sock
             hostPath:
               path: /var/run/docker.sock
           - name: fs-stats
             hostPath:
               path: /var/lib/docker
           - name: docker
             hostPath:
               path: /usr/bin/docker
           - name: proc
             hostPath:
               path: /proc
           - name: snap-tasks
             configMap:
               name: snap-tasks
    ---
    apiVersion: v1
    kind: ConfigMap
    metadata:
     name: snap-tasks
    data:
     core.json: |-
       {
           "version": 1,
           "schedule": {
               "type": "simple",
               "interval": "30s"
           },
           "workflow": {
               "collect": {
                   "metrics": {
                       "/intel/docker/*":{},
                       "/intel/procfs/cpu/*": {},
                       "/intel/procfs/meminfo/*": {},
                       "/intel/procfs/iface/*": {},
                       "/intel/linux/iostat/*": {},
                       "/intel/procfs/load/*": {}
                   },
                   "config": {
                       "/intel/procfs": {
                           "proc_path": "/proc_host"
                       }
                   },
                   "process": null,
                   "publish": [
                       {
                           "plugin_name": "graphite",                   
                           "config": {
                               "prefix": "API-KEY.snap.<%NODE%>",
                               "server": "ACCOUNT-UID.carbon.hostedgraphite.com",
                               "port": 2003
                           }
                       }
                   ]
               }
           }
       }

- Update the **prefix** and **server** lines at the end of the file, and save. Your API-KEY and ACCOUNT-UID can be located in your Hosted Graphite account => Send Metrics button.

- Then use this command to run the file and start the daemon: ``kubectl create -f snap_ds.yml``

- Confirm the daemon is running with this command ``kubectl get pod`` to see a similar output:

.. code-block:: none

    NAME                       READY   STATUS    RESTARTS   AGE
    snap-dblx2                 1/1     Running   0          56m

    
You should now be able to see metrics coming into your Hosted Graphite account with the `snap` prefix. 


Metrics
-------

Check out the following repositories to learn more about the types of performance metrics that are collected with the Snap_k8s daemon:

- `CPU <https://github.com/intelsdi-x/snap-plugin-collector-cpu/blob/master/METRICS.md>`_
- `Memory <https://github.com/intelsdi-x/snap-plugin-collector-meminfo/blob/master/METRICS.md>`_
- `Load <https://github.com/intelsdi-x/snap-plugin-collector-load#collected-metrics>`_
- `Interface <https://github.com/intelsdi-x/snap-plugin-collector-interface/blob/master/METRICS.md>`_

**Disclaimer:** this agent collects a fairly large number of metrics, approximately 1,000 per node in each Kubernetes cluster it's deployed into. If you wish to reduce the number of metrics collected, you could remove metric patterns from the 'metrics' section of the config.
