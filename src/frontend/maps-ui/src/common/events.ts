export type ReactEventArgs = React.KeyboardEvent | React.MouseEvent;

export class EventHandler<EventArgs>
{
	constructor
	(
		private action: (e: EventArgs) => void
	)
	{

	}

	public invoke(e: EventArgs)
	{
		this.action(e);
	}
}

export class Event<EventArgs>
{
	handlers: EventHandler<EventArgs>[] = []

	public subscribe(handler: EventHandler<EventArgs>): void
	{
		this.handlers.push(handler);
	}

	public unsubscribe(handler: EventHandler<EventArgs>): void
	{
		const index = this.handlers.lastIndexOf(handler);
		if (index < 0) return;
		this.handlers.splice(index, 1);
	}

	public fire(e: EventArgs): void
	{
		for (let handler of this.handlers)
		{
			handler.invoke(e);
		}
	}
}
