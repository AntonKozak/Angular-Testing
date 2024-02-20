import { MessageService } from './message.service';

describe('Message service testing ', () => {
  let service: MessageService;

  beforeEach(() => {
    service =new MessageService;

  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

    it('should have no messages to start', () => {
        expect(service.messages.length).toBe(0);
    });

  it('should add a message', () => {
    service.add('message1');
    expect(service.messages.length).toBe(1);
  });

  it('should remove all messages', () => {
    service.add('message1');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
