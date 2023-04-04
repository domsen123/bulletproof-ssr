export class EventDispatcher {
  private subscribers: { eventName: string; handler: (payload: any) => Promise<void> }[] = []

  public async dispatch(eventName: string, payload: any) {
    await Promise.all(
      this.subscribers.filter(s => s.eventName === eventName).map(s => s.handler(payload)),
    )
  }

  public subscribe(eventName: string, handler: (payload: any) => Promise<void>) {
    this.subscribers.push({
      eventName,
      handler,
    })
  }
}
