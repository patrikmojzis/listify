<?php

namespace App\Mail;

use App\Models\TodoListShare;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TodoListShareInvitation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $todoListShare;

    /**
     * Create a new message instance.
     */
    public function __construct(TodoListShare $todoListShare)
    {
        $this->todoListShare = $todoListShare;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '✉️ Listify: ToDo List Invitation',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.todo_list_share_invitation',
            with: [
                'senderName' => $this->todoListShare->invitedByUser?->name,
                'invitationUrl' => $this->todoListShare->invitationUrl,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
