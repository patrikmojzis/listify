<?php

namespace App\Notifications;

use App\Models\TodoItem;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TodoItemCompletedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $todoItem;

    /**
     * Create a new notification instance.
     */
    public function __construct(TodoItem $todoItem)
    {
        $this->todoItem = $todoItem;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('🎉 Listify: Task Marked Completed')
            ->line("The task '{$this->todoItem->title}' has been completed.");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
