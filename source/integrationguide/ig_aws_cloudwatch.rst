
AWS CloudWatch
==============

.. index:: AWS CloudWatch, IAM Policy, AWS Policy, Amazon Policy

Hosted Graphite provides an `Amazon AWS CloudWatch <https://aws.amazon.com/cloudwatch/>`_ add-on available in the `Add-Ons <https://www.hostedgraphite.com/app/addons/>`_ page of your account.  This add-on syncs the metrics from the specified AWS services/regions into your account.

To connect to your CloudWatch account, you need to setup **Identity and Access Management (IAM)** access keys in your
`AWS Account <https://console.aws.amazon.com/iam/>`_, with the appropriate permissions to allow Hosted Graphite
to connect and collect your metrics.

.. contents::

.. _iam_accesskeys:

.. index:: IAM Keys, AWS Keys, Amazon keys

.. _iam_policy:

Configuring AWS
---------------

IAM Policy
~~~~~~~~~~

Let's create a policy that we will later attach to the user.

- In the IAM Dashboard, click on Policies (on the left) or Customer Managed Policies in under IAM Resources, then click on `Create Policy <https://console.aws.amazon.com/iam/home#/policies$new?step=edit>`_.
- Switch to the JSON tab, replace the existing text with the policy provided below and click '**Review policy**'.
- Give the policy a name (Eg: HG_policy) and a description (optional).
- Save the policy by clicking '**Create Policy**'.

.. code-block:: json

    {
        "Statement": [
            {
                "Sid": "PermissionsForMetrics",
                "Effect": "Allow",
                "Action": [
                    "cloudwatch:ListMetrics",
                    "cloudwatch:GetMetricStatistics",
                    "ec2:DescribeInstances",
                    "ec2:DescribeVolumes",
                    "rds:DescribeDBInstances",
                    "route53:ListHealthChecks",
                    "sqs:ListQueues",
                    "elasticache:DescribeCacheClusters",
                    "elasticloadbalancing:DescribeLoadBalancers",
                    "kinesis:ListStreams",
                    "redshift:DescribeClusters",
                    "elasticmapreduce:ListClusters",
                    "elasticmapreduce:DescribeCluster",
                    "cloudfront:ListDistributions"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Sid": "PermissionsForTags",
                "Effect": "Allow",
                "Action": [
                    "elasticache:ListTagsForResource",
                    "elasticloadbalancing:DescribeTags",
                    "cloudfront:ListTagsForResource",
                    "route53:ListTagsForResource",
                    "kinesis:ListTagsForStream",
                    "rds:ListTagsForResource",
                    "lambda:ListFunctions",
                    "iam:GetUser"
                ],
                "Resource": [
                    "*"
                ]
            }
        ],
        "Version": "2012-10-17"
    }


IAM User
~~~~~~~~

With the policy set up, we'll create a user to attach the policy to. We'll use the Access Key/Secret Key tokens to give Hosted Graphite permission to import CloudWatch metric data.

- In the IAM Console, click on '**Users**' on the left or under IAM Resources. Then select '**Add User**'.
- Give the user a name (Eg: HG_addon) and '**Programmatic access**' for the Access type.
- Click '**Next: Permissions**' and click the '**Attach existing policies directly**' button along the top.
- Search for the policy we just created and attach it by clicking the corresponding checkbox, then press '**Next: Review**'.
- Click on '**Create User**' and copy the the Access Key and Secret Key into the relevant fields on the add-on set-up page `here <https://www.hostedgraphite.com/app/addons/aws/account/>`_. Optionally, you can download a copy of this account information, but keep it safe as this information can be sensitive.

.. figure:: /docimg/integrations/aws/cloudwatch-userkeys.png
   :scale: 80%
   :alt: Access Keys
   :align: center


.. index:: CloudWatch, Enable CloudWatch, Enable AWS CloudWatch, Amazon Stats

Configuring Hosted Graphite
---------------------------

Enabling The AWS CloudWatch Add-On
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To enable the CloudWatch add-on, go to the `add-ons <https://www.hostedgraphite.com/app/addons/>`_ page in your
Hosted Graphite account and choose the option for **Amazon AWS CloudWatch**.

You will be presented with the following page, from which you can create, edit or delete AWS configs or create, edit or delete tags:

.. figure:: /docimg/integrations/aws/aws_account_listing.png
   :scale: 80%
   :alt: AWS Account Listing
   :align: center

If you click **AWS Tags** you will be presented with the following screen which allows you to edit the tags. Each tag has a unique name (shown on the left) and one or more values. Values are separated by a comma.  If for example you enter "hello, world" for tag "Tag_Next" then the CloudWatch Add-On will match any tag called "Tag_Next" that has either "hello" or "world" as its value.

.. figure:: /docimg/integrations/aws/aws_tags_screen.png
   :scale: 80%
   :alt: AWS CloudWatch Tags
   :align: center


If you click **Cancel** and go back to the previous screen and click **Account Names**, you can see this screen from which you can edit a particular AWS configuration.

.. figure:: /docimg/integrations/aws/aws_account_edit.png
   :scale: 80%
   :alt: AWS CloudWatch Configuration
   :align: center

   AWS CloudWatch Configuration


- | **AWS Access Key** and **AWS Secret Access Key**
  | These are the keys you saved when you :ref:`set up your IAM user <iam_accesskeys>`.

- | **AWS Regions**
  | Choose the regions containing the services you wish to monitor.  You must choose at least one region.

- | **AWS Services**
  | Choose the services which will be queried for metrics.

- | **EC2 Instance Aliasing**
  | Choose this if you would like Hosted Graphite to import your EC2 instance metrics using an instance's name instead of it's ID. For instance aliasing to work, it is required that your instances have a "Name" tag defined whose value will be used in place of the instance id. **Please note** that enabling this feature will create new metrics in your account for each of your EC2 instances that have the "Name" tag. The old instance id based metrics will remain dormant until they expire. **Name tags containing spaces are currently not supported and will be dropped**

- | **EMR Cluster Aliasing**
  | Select this if you would like Hosted Graphite to import your EMR cluster metrics using an cluster's name instead of it's ID. For cluster aliasing to work, it is required that your clusters have a "Name" tag defined whose value will be used in place of the cluster id. **Please note** that enabling this feature will create new metrics in your account for each of your EMR clusters that have the "Name" tag. The old cluster id based metrics will remain dormant until they expire. **Name tags containing spaces are currently not supported and will be dropped**

- | **Service tagging for this AWS account**
  | Choose the services that you would like to enable tagged imports for. This will only import metrics from tagged resources for those services. Once you enable this per account, you can type in the tag's "key": "value" pairs that you would like to be imported. These key values must also be present in your AWS resources to be imported successfully. For more information on adding these tags go to the `AWS docs <http://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/allocation-how.html>`_.

When you click on '**Save**', some basic checks will be performed on your keys if successful, your configuration
will be saved. If you have at least one service chosen, the cloudwatch add-on will be enabled.

.. index:: Disable CloudWatch, Disabling AWS CloudWatch

Disabling The CloudWatch Add-On
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Go to the `add-ons <https://www.hostedgraphite.com/app/addons/>`_ page in your Hosted Graphite account,
and choose the option for **Amazon AWS CloudWatch**.

Click the **Delete** button and the CloudWatch add-on will be disabled for that account.


.. index:: AWS Account Names

Enabling Account Naming
~~~~~~~~~~~~~~~~~~~~~~~

If you use multiple AWS Access Keys on your Hosted Graphite account for different AWS accounts, projects or environments, you can keep the metrics separated by assigning **Account Names** to your Access Keys.

Under the list of Access Keys on your HG account, there's an button to access the Account Names interface. There you can assign names to your Access Keys, which will then become part of the metric name for all metrics retrieved using that key. In the example below, the Access Key was assigned the name 'test', so metrics retrieved through that access key will follow the naming structure 'aws.test.[service]*'

.. figure:: /docimg/integrations/aws/aws_account_names.png
   :scale: 80%
   :alt: AWS CloudWatch Configuration
   :align: center

If you were previously not using an Account Name and have recently added one, your automatically generated AWS Dashboards will no longer map to the correct metrics. You can tick the option on the Account Names screen (above) to generate new dashboards which use the new Account Names.


.. index:: AWS Billing


Enable Route53 Metrics
~~~~~~~~~~~~~~~~~~~~~~

Amazon Route53 metrics are only received if you enable US East (N. Virginia) as the current region. These metrics are not available from any other region.


.. index:: Disclaimer

Disclaimer
----------

While we attempt to minimize the number of API calls which may incur Amazon charges, Hosted Graphite disclaims responsibility for potential costs incurred by use of this add-on.

Our add-on performs read-only requests to the CloudWatch API. Should the provided
:ref:`AWS Access Keys <iam_accesskeys>` grant greater privileges than what our specified :ref:`IAM Policy <iam_policy>`
defines, responsibility for any activity performed using those keys lies with the customer.

.. _cloudwatch_costs:

CloudWatch Costs
~~~~~~~~~~~~~~~~

Amazon AWS offers the first one million API requests at no charge. In excess of that, Amazon will charge $0.01
per 1000 requests. See the `CloudWatch Pricing <https://aws.amazon.com/cloudwatch/pricing/>`_ page for more information on Amazon pricing.

We make calls to every 10min fetch your metrics from AWS, but feel free to reach out to `support@hostedgraphite.com <mailto:support@hostedgraphite.com>`_ if you would like us to configure a custom pull interval for you.

We aim to make as few requests as possible to fetch your metrics. If you have many instances, or are monitoring
many services, you will likely exceed this boundary.  If this is the case, these charges will be likely be negligible
in comparison to what `Amazon charges <https://aws.amazon.com/cloudwatch/pricing/>`_ just to have monitoring enabled
for those services.

Metric Name Mapping
-------------------

The AWS metrics for each service are mapped to Hosted Graphite metric names as follows: ::

    aws.{service}.{region}.{grouping}.{id}.{metricname}

* **service** - A short token representing the service, e.g. *ec2*, or *rds*.
* **region** - The AWS region, e.g. *us-east-1*.
* **grouping** - A short token representing the grouping ('dimension' in AWS speak) for the metric, e.g. **inst** for *InstanceId*.
* **id** - The identifier for the service/instance, e.g. *Instance id* or *Name tag* for EC2.
* **metricname** - The AWS metric name is directly used, e.g. *CPUUtilization*.


=======================================  =========================  ================================================
AWS Service                              AWS 'Dimension'            HG metric name
=======================================  =========================  ================================================
Elastic Compute Cloud (EC2)              InstanceId                 aws.ec2.{region}.inst.{id}.CPUUtilization
Elastic Block Store (EBS)                VolumeId                   aws.ebs.{region}.vol.{id}.VolumeWriteBytes
Relational Database Service (RDS)        DBInstanceIdentifier       aws.rds.{region}.inst.{id}.CPUUtilization
Elastic MapReduce (EMR)                  JobFlowId                  aws.emr.{region}.job_flow_id.{id}.CPUUtilization
=======================================  =========================  ================================================

So, for example, the *CPUUtilization* metric for the '*i-abcd1234*' EC2 instance in Virigina will be
imported as '*aws.ec2.us-east-1.inst.i-abcd1234.CPUUtilization*'. You can find the mapping for each
individual AWS service we support below:

List of Metric Name Mappings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are having trouble querying Hosted Graphite metrics that have been imported from your AWS services perhaps you are not entering the metric query correctly. 

The format of these metrics changes per service and has multiple formats per service. These formats depend on 'Dimensions' in the AWS metric or in some cases if the AWS metric came from an AWS ARN (Amazon Resource Name). 

For further information on AWS Dimensions and AWS ARNs please consult their corresponding AWS documentations.

Here is a list of how each indivdual service's metrics are formatted in Hosted Graphite:

+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|AWS Service                       |AWS 'Dimensions'                              |HG metric names                                                                                   |
+==================================+==============================================+==================================================================================================+
|API Gateway                       |ApiName, Method, Resource, Stage              |aws.apigateway.{region}.apiname.{ApiName}.method.{Method}.resource.{Resource}.stage.{Stage}.{name}|
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+        
|                                  |ApiName, Stage                                |aws.apigateway.{region}.apiname.{ApiName}.stage.{Stage}.{name}                                    |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |ApiName                                       |aws.apigateway.{region}.apiname.{ApiName}.{name}                                                  |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Application Elastic Load Balancing|LoadBalancer, AvailabilityZone, TargetGroup   |aws.alb.{region}.inst.{LoadBalancer}.{AvailabilityZone}.{TargetGroup}.{name}                      |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |LoadBalancer                                  |aws.alb.{region}.inst.{LoadBalancer}.{name}                                                       |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |                                              |arn_format: arn:aws:elasticloadbalancing:{region}:{account-id}:loadbalancer/{loadbalancername}    |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|AutoScaling Groups                |AutoScalingGroupName                          |aws.autoscaling.{AutoScalingGroupName}.{name}                                                     |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|AWS Billing                       |ServiceName, LinkedAccount                    |aws.billing.linked_account.{LinkedAccount}.service.{ServiceName}.{name}                           |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |ServiceName                                   |aws.billing.service.{ServiceName}.{name}                                                          |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |LinkedAccount                                 |aws.billing.linked_account.{LinkedAccount}.{name}                                                 |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |                                              |aws.billing.{name}                                                                                |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|CloudFront                        |DistributionId                                |aws.cloudfront.distribution_id.{DistributionId}.{name}                                            |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Direct Connect                    |Connection, VirtualInterface                  |aws.directconnect.{region}.connection_id.{ConnectionId}.virtual_interface_id.                     |
|                                  |                                              |{VirtualInterfaceId}.{name}                                                                       |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|DynamoDB                          |TableName, Operation, GlobalSecondaryIndexName|aws.dynamodb.{region}.table.{TableName}.operation.{Operation}.secondary_index.                    |
|                                  |                                              |{GlobalSecondaryIndexName}.{name}                                                                 |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Elastic Block Store               |VolumeId                                      |aws.ebs.{region}.vol.{VolumeId}.{name}                                                            |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Elastic Compute Cloud             |InstanceId                                    |aws.ec2.{region}.inst.{InstanceId}.{name}                                                         |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|EC2 Spotfleet                     |AvailabilityZone, FleetRequestId, InstanceType|aws.spotfleet.{AvailabilityZone}.{FleetRequestId}.{InstanceType}.{name}                           |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|ECS Metrics                       |ClusterName, ServiceName                      |aws.ecs.{region}.cluster.{ClusterName}.service.{ServiceName}.{name}                               |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |ClusterName                                   |aws.ecs.{region}.cluster.{ClusterName}.{name}                                                     |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Elastic File System               |FileSystemId                                  |aws.efs.{region}.FileSystemId.{FileSystemId}.{name}                                               |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Elastic Load Balancing            |LoadBalancerName, AvailabilityZone            |aws.elb.{region}.inst.{LoadBalancerName}.{AvailabilityZone}.{name}                                |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |LoadBalancerName                              |aws.elb.{region}.inst.{LoadBalancerName}.{name}                                                   |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Elasticsearch Service             |DomainName, NodeId, ClientId                  |aws.es.{region}.{DomainName}.{NodeId}.{ClientId}.{name}                                           |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |DomainName, ClientId                          |aws.es.{region}.{DomainName}.{ClientId}.{name}                                                    |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|ElastiCache                       |CacheClusterId, CacheNodeId                   |aws.elasticache.{region}.cache_cluster_id.{CacheClusterId}.cache_node_id.{CacheNodeId}.{name}     |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |CacheClusterId                                |aws.elasticache.{region}.cache_cluster_id.{CacheClusterId}.{name}                                 |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |                                              |arn_format: arn:aws:elasticache:{region}:{account_id}:cluster:{instance_name}                     |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Elastic MapReduce                 |JobFlowId                                     |aws.emr.{region}.job_flow_id.{JobFlowId}.{name}                                                   |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Kinesis Firehose                  |DeliveryStreamName                            |aws.firehose.{region}.{DeliveryStreamName}.{name}                                                 |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Kinesis Streams                   |StreamName                                    |aws.kinesis.{region}.stream_name.{StreamName}.{name}                                              |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Lambda Functions                  |FunctionName                                  |aws.lambda.{region}.function.{FunctionName}.{name}                                                |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Relational Database Service       |DBInstanceIdentifier                          |aws.rds.{region}.inst.{DBInstanceIdentifier}.{name}                                               |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |                                              |arn_format: arn:aws:rds:{region}:{account_id}:db:{instance_name}                                  |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Redshift                          |NodeID, ClusterIdentifier                     |aws.redshift.{region}.cluster.{ClusterIdentifier}.node.{NodeID}.{name}                            |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |ClusterIdentifier                             |aws.redshift.{region}.cluster.{ClusterIdentifier}.{name}                                          |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |NodeID                                        |aws.redshift.{region}.node.{NodeID}.{name}                                                        |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Route 53                          |HealthCheckId                                 |aws.route53.{region}.health_check_id.{HealthCheckId}.{name}                                       |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|S3 (Simple Storage Service)       |BucketName, StorageType                       |aws.s3.{region}.bucket.{BucketName}.type.{StorageType}.{name}                                     |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Simple E-mail Service             |                                              |aws.ses.{region}.{name}                                                                           |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Simple Notification Service       |TopicName                                     |aws.sns.{region}.{TopicName}.{name}                                                               |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |SMSType, Country                              |aws.sns.{region}.{SMSType}.{Country}.{name}                                                       |
|                                  +----------------------------------------------+--------------------------------------------------------------------------------------------------+
|                                  |                                              |aws.sns.{region}.{name}                                                                           |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+
|Simple Queue Service              |QueueName                                     |aws.sqs.{region}.queue.{QueueName}.{name}                                                         |
+----------------------------------+----------------------------------------------+--------------------------------------------------------------------------------------------------+

