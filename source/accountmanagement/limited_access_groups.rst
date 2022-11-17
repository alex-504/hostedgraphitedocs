
Team Access: Limited Access Groups
==================================

Note: This feature is for Enterprise users only.

.. contents::

Limited Access groups are a way to define groups of dashboards, and limit specific team members access to these groups. By default, when not using this feature, team members can access all the dashboards in the account.

Limited Access groups are created and edited on the Limited Access Group Management page and can then be associated with team members on the User Management page. Once a user has been associated with one or more groups, they will only be able to see the dashboards in that group.



User Management
---------------

.. figure:: /docimg/usergroup.gif
   :scale: 100%
   :alt: View User Management
   :align: center

Here you can see a list of team members who are assigned some Limited Access groups. To assign a Limited Access Group to a team member, click to reveal the drop down and select from the list.

Clicking the 'x' beside a Limited Access groups name will un-assign the group from that team member.

Once finished making any changes click the "Save Changes" button.



Group Management Page
----------------------

For adding, removing or editing Limited Access groups.

Overview:

.. figure:: /docimg/limited-access-group-page.png
   :scale: 100%
   :alt: View Limited Access groups
   :align: center
   

Here you can see the Limited Access groups you have created and some information about them.
To edit an existing group: click the pen icon on the right hand side.
To delete a group: click the bin icon on the right hand side.

Clicking "+ New Limited Access Group" will reveal a pop up that looks like this:

.. figure:: /docimg/addgroup.gif
   :scale: 80%
   :alt: View Limited Access groups
   :align: center

Choose a Limited Access Group name and pick the dashboards you want to be accessible for that group (this can be edited later). Click save to keep this group.

After this return to the User Management page to associate the created group with team members.



Team Managers / Account Owners
------------------------------

These both have access to the team management page, they can create new Limited Access groups, add and remove dashboards to/from a group.

Team managers cannot be assigned a Limited Access Group. Team managers always have access to all dashboards.



Read-Only Users
---------------

Read only team members can be assigned to any number of groups. Once assigned to one or more Limited Access groups, a read-only team member will only see dashboards which belong to the groups which they have been assigned. They cannot save or create new dashboards.



Read/Write Users
----------------

Read/write team members can be assigned any number of groups. Once assigned one or more Limited Access groups, a read/write team member will only be able to see dashboards which belong to the groups they have been assigned. They can save and create new dashboards.

When a read/write team member creates a new dashboard, all team members assigned to their Limited Access groups will also gain access. 

Similarly, when they save a dashboard, all team members with permission to view will see those changes. 


Notes
-----

A team member who is not assigned to any Limited Access groups will have access to all dashboards.

A team member's role (read-only, read/write) applies within all the Limited Access groups they are assigned.

Even with an accesskey, a team member can not view a dashboard if they are not assigned to a Limited Access Group with access to the dashboard. If you need to share a dashboard but cannot assign a group to the team member, we suggest using the dashboard snapshot-sharing feature.
