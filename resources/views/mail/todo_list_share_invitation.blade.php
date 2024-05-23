<!DOCTYPE html>
<html>
<head>
    <title>✉️ Listify: ToDo List Invitation</title>
</head>
<body>
<p>Hello,</p>

<p>{{ $senderName }} has invited you to collaborate on their ToDo list.</p>

<p>You can view and manage the ToDo list by clicking the link below:</p>

<p><a href="{{ $invitationUrl }}">View ToDo List</a></p>

<p>If you have any questions, feel free to contact us.</p>

<p>Best regards,</p>
<p>Listify</p>
</body>
</html>
