
export const parseChat = chatString => {
    const regExpSingleChatMessage = /(\d{2}(:\d{2}){2}) (?:(?!((?<=[.])(\d{2}(:\d{2}){2}))).)*\n?/g;
    const chatMessages = chatString.match(regExpSingleChatMessage);
    let customerName = '';

    return chatMessages
            .map((string, index) => {
                const regExpMessageSplit = /((\d{2}:\d{2}:\d{2}) (Agent|Customer|[^\n\r:]*) (?:[: ])*)/g;
                const [ mention, date, name, sentence ] = string.split(regExpMessageSplit).filter(str => !!str);
                const nameToType = nameString => {
                    return nameString === customerName ? 'customer' : 'agent'
                };

                if( index === 0 ){
                    customerName = name;
                }

                return {
                    date,
                    mention,
                    sentence,
                    type: nameToType(name)
                }
            })
}
