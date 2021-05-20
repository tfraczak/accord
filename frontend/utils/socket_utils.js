import { convertToSnakeCase } from './func_utils';

export const createChatSocket = (type, chatId, receiveMessage, receiveMessages) => {
    return App.cable.subscriptions.create(
        {
            channel: `ChatChannel`,
            type,
            chatId,
        },
        {
            received: data => {
                if (data.messages) {
                    return receiveMessages(data.messages)
                }
                if (data.message) {
                    receiveMessage(data.message);
                    this.setState({
                        messages: this.state.messages.concat(data.message)
                    });
                }
            },
            speak: data => {
                return this.subscription.perform("speak", data);
            },
            unsubscribed: () => {
                return this.subscription.perform("unsubscribed");
            },
            load: () => {
                return this.subscription.perform("load");
            }
        }
    );
}