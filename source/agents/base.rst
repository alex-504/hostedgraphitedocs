Base Metrics
============

This document describes the base system metrics exported by the Hosted Graphite
agent.

.. contents::

We focus on the default "base" dashboard, and also provide notes on related
metrics not displayed there.

As Diamond collectors rely heavily on ``/proc`` data, many of the notes below
are from Linux kernel documentation, e.g. `proc.txt
<https://www.kernel.org/doc/Documentation/filesystems/proc.txt>`_;

We list metric unit - percentage, count, bytes, etc. - in brackets after each
metric description.

If you find anything unclear or incorrect here, please `let us know
<mailto:help@hostedgraphite.com>`_!

Load
----

CPU utilization
+++++++++++++++

.. figure:: /docimg/agent/base_cpu.png
   :alt: User & system CPU
   :align: center

   User & system CPU graphs

These metrics are found under::

  hg_agent.hostname.cpu.cpuid.*

and represent percentages of time each *cpuid* spends in particular states.

We display two of the most interesting on the dashboard:

- ``user``: normal processes executing in user mode (percentage);
- ``system``: processes executing in kernel mode (percentage).

Others you can use in your own graphs or investigations:

- ``nice``: niced processes executing in user mode (percentage);
- ``idle``: nothing to do (percentage);
- ``iowait``: not really reliable - see note in `proc.txt <https://www.kernel.org/doc/Documentation/filesystems/proc.txt>`_;
- ``irq``: servicing interrupts (percentage);
- ``softirq``: servicing software interrupts (percentage);
- ``steal``: executing other virtual hosts (percentage);
- ``guest``: running a normal virtual guest (percentage);
- ``guest_nice``: running a niced virtual guest (percentage).

Load average
++++++++++++

.. figure:: /docimg/agent/base_loadavg.png
   :alt: Load average
   :align: center

   Load average graph

These metrics are found under::

  hg_agent.hostname.loadavg.*

Load average, `roughly speaking
<https://prutser.wordpress.com/2012/05/28/understanding-linux-load-average-part-3/>`_,
is the average number of tasks waiting with "something to do" over a period of
time:

- ``01``: 1-minute load average (count);
- ``05``: 5-minute load average (count);
- ``15``: 15-minute load average (count).

Since the interpretation of load average is `affected
<http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages>`_ by
the number of cores a machine has, you might like to use these "normalized"
versions in your own graphs or investigations:

- ``01_normalized``: 1-minute load average normalized by #cores (count);
- ``05_normalized``: 5-minute load average normalized by #cores (count);
- ``15_normalized``: 15-minute load average normalized by #cores (count).

Processes
+++++++++

.. figure:: /docimg/agent/base_processes.png
   :alt: Processes
   :align: center

   Processes graph

These metrics are found under::

  hg_agent.hostname.loadavg.*

These are simple "snapshot" counters of the process numbers. Note that the
number running will typically be maxed out at #cores.

- ``processes_total``: total number of processes on the system (count);
- ``processes_running``: number of processes running (count).

Memory
------

Activity
++++++++

.. figure:: /docimg/agent/base_memory.png
   :alt: Memory and swap
   :align: center

   Memory and swap graphs

These metrics are found under::

  hg_agent.hostname.memory.*

In the "memory activity" graph, we display some of the metrics most relevant to
physical memory usage:

- ``MemTotal``: total usable ram, i.e. physical ram minus a few reserved bits
  and the kernel binary code (bytes);
- ``MemAvailable``: an estimate of how much memory is available for starting
  new applications, requires kernel 3.14 or later (bytes);
- ``Active``: memory used recently, usually not reclaimed unless absolutely
  necessary (bytes);
- ``Cached``: in-memory cache for files read from the disk, i.e. the pagecache (bytes).

And "swap activity" displays:

- ``SwapTotal``: total amount of swap space configured (bytes);
- ``SwapFree``: amount of swap space available for use (bytes).

There are several other metrics available under ``memory.*``. If you're digging
further, you can find out what they mean in the `docs for /proc/meminfo
<https://www.kernel.org/doc/Documentation/filesystems/proc.txt>`_.

Virtual memory
++++++++++++++

.. figure:: /docimg/agent/base_vmstat.png
   :alt: Virtual memory stats
   :align: center

   vmstat graphs

These metrics are found under::

  hg_agent.hostname.vmstat.*

These are metrics from ``/proc/vmstat`` and give some insight into the activity
of the Linux virtual memory system. Unfortunately, the counters are `a little
underdocumented <http://linuxinsight.com/proc_vmstat.html>`_.

First, pages in and out:

- ``pgpgin``: pages brought in from disk (count);
- ``pgpgout``: pages written out to disk (count).

Note that because everything goes through the `page cache
<https://en.wikipedia.org/wiki/Page_cache>`_, these are recorded for
essentially all pages read from or written to disk, so if you're doing a lot of
IO they'll be elevated.

Next, `swap usage <https://wiki.archlinux.org/index.php/swap>`_ which
generally you want to keep low or nonexistent. See `this article
<http://www.linuxjournal.com/article/8178>`_ for more information.

- ``pswpin``: pages brought in from swap space (count);
- ``pswpout``: pages swapped out into swap space (count).

Finally, `page faults <https://en.wikipedia.org/wiki/Page_fault>`_ made by the
virtual memory system to page memory into process address spaces:

- ``pgfault``: `minor <https://en.wikipedia.org/wiki/Page_fault#Minor>`_ page
  faults (count);
- ``pgmajfault``: `major <https://en.wikipedia.org/wiki/Page_fault#Major>`_
  page faults (count).

Note that page faults will stimulate paging in, so you can expect these to correlate.

Writeback
+++++++++

.. figure:: /docimg/agent/base_writeback.png
   :alt: writeback stats
   :align: center

   Memory writeback graphs

These metrics are found under::

  hg_agent.hostname.memory.*

- ``Dirty``: memory waiting to be written back to disk (bytes).

When you change disk-backed memory in the page cache, it's not written to disk
immediately, just marked as "dirty". This graph allows you to see how much is
building up & being written back over time.

Disk
----

iostat
++++++

.. figure:: /docimg/agent/base_diskthru.png
   :alt: iostat graphs
   :align: center

   iostat graphs

These metrics are found under::

  hg_agent.hostname.iostat.*

These metrics are per-disk, and are gathered from `/proc/diskstats
<https://www.kernel.org/doc/Documentation/iostats.txt>`_.

- ``iops``: "I/O operations per second", i.e. ``reads`` + ``writes`` (count);
- ``write_byte_per_second``: bytes written per second (bytes);
- ``read_byte_per_second``: bytes read per second (bytes);
- ``util_percentage``: how much of the time the disk is performing I/O
  operations (percentage).

There are many other ``iostat`` metrics exported per disk; you can browse your
metric tree to see which and compare with `/proc/diskstats
<https://www.kernel.org/doc/Documentation/iostats.txt>`_ and `the 'diskusage'
diamond collector
<https://github.com/python-diamond/Diamond/blob/master/src/collectors/diskusage/diskusage.py>`_.

Capacity
++++++++

.. figure:: /docimg/agent/base_diskavail.png
   :alt: Disk capacity stats
   :align: center

   Disk capacity graphs

These metrics are found under::

  hg_agent.hostname.diskspace.*

Again, these metrics are per-disk.

- ``byte_avail``: available bytes, i.e. space available for use by
  non-privileged users (bytes).

Apart from this useful graphed value, there are also some more available to
you:

- ``byte_free``: available bytes for the superuser (bytes);
- ``byte_percentfree``: ``byte_free`` as a percentage of the total (percentage);
- ``byte_used``: bytes used (bytes);
- ``inodes_avail``: available inodes for use by non-privileged users (count);
- ``inodes_free``: available inodes for the superuser (count);
- ``inodes_percentfree``: ``inodes_free`` as a percentage of the total (percentage);
- ``inodes_used``: inodes used (count).

Network
-------

Interfaces
++++++++++

.. figure:: /docimg/agent/base_interfaces.png
   :alt: Network interface stats
   :align: center

   Network interface graphs

These metrics are found under::

  hg_agent.hostname.network.*

These metrics are per-interface. We graph the following:

- ``tx_packets``, ``rx_packets``: packets transmitted, received (count);
- ``tx_byte``, ``rx_byte``: bytes transmitted, received (bytes);
- ``tx_drop``, ``rx_drop``: packets dropped by the driver on transmit,
  receive (count).

There are many other ``network`` metrics exported per interface; you can
browse your metric tree to see which and compare with `/proc/net/dev
<http://www.onlamp.com/pub/a/linux/2000/11/16/LinuxAdmin.html>`_, which is
fairly self-explanatory, and `the 'network' diamond collector
<https://github.com/python-diamond/Diamond/blob/master/src/collectors/network/network.py>`_.

Sockets
+++++++

.. figure:: /docimg/agent/base_sockets.png
   :alt: Socket stats
   :align: center

   Socket graphs 

These metrics are found under::

  hg_agent.hostname.sockets.*

They're drawn from ``/proc/net/sockstat``, which is under-documented.

- ``used``: total number of sockets `in kernel socket lists
  <http://elixir.free-electrons.com/linux/latest/source/net/socket.c#L169>`_ (count);
- ``tcp_inuse``: TCP sockets currently in use (count);
- ``udp_inuse``: UDP sockets currently in use (count).

Others you can use in your own graphs or investigations:

- ``tcp_mem``: the number of `pages
  <http://blog.tsunanet.net/2011/03/out-of-socket-memory.html>`_ in use for
  TCP (count);
- ``udp_mem``: the same for UDP (count);
- ``tcp_alloc``: number of sockets allocated for TCP (count);
- ``tcp_orphan``: sockets `not associated to file descriptors
  <http://blog.tsunanet.net/2011/03/out-of-socket-memory.html>`_ (count);
- ``tcp_tw``: sockets in ``TIME_WAIT``, i.e. waiting after close to handle
  packets still in the network (count).
