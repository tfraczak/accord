export const serverMembers = (usersState, server, membershipsState) => {
    if (server) {
        const users = Object.values(usersState);
        const memberships = Object.values(membershipsState)
        const serverMemberships = memberships.filter(membership => {
            return (membership.joinableType === "Server") && (membership.joinableId === server.id);
        });
        const serverMemberIds = serverMemberships.map(membership => membership.userId);
        const members = users.filter(user => serverMemberIds.includes(user.id));
        return attachLocalUsername(members, serverMemberships)
    }
};

export const serverMembersObj = (usersState, server, membershipsState) => {
    if (server) {
        const membersArr = serverMembers(usersState, server, membershipsState)
        let members = {};
        for(let member of membersArr) { members[member.id] = member }
        return members;
    }
};

export const conversationMembers = (usersState, conversation, membershipsState) => {
    if (conversation) {
        const users = Object.values(usersState);
        const memberships = Object.values(membershipsState)
        const convoMemberships = memberships.filter(membership => {
            return (membership.joinableType === "Conversation") && (membership.joinableId === conversation.id);
        });
        const convoMemberIds = convoMemberships.map(membership => membership.userId);
        const members = users.filter(user => convoMemberIds.includes(user.id));
        return members;
    }
};

export const convoMembersObj = (usersState, conversation, membershipsState) => {
    if (conversation) {
        const membersArr = conversationMembers(usersState, conversation, membershipsState)
        let members = {};
        for(let member of membersArr) { members[member.id] = member }
        return members;
    }
};



const attachLocalUsername = (usersArr, membershipsArr) => {

    for (let i = 0; i < usersArr.length; i++) {
        for (let j = 0; j < membershipsArr.length; j++) {
            if (membershipsArr[j].userId === usersArr[i].id) {
                usersArr[i]["localUsername"] = membershipsArr[j].localUsername;
                usersArr[i]["membershipId"] = membershipsArr[j].id;
                break;
            }
        } 
    }
    return usersArr;
};

export const currentUsersMembershipId = (currentUserId, usersState, server, membershipsState) => {
    if (server) {
        const members = serverMembers(usersState, server, membershipsState);
        let mId;
        for (let member of members) {
            if (member.id === currentUserId) {
                mId = member.membershipId;
                break;
            }
        }
        return mId;
    }
}

export const serverChannels = (server, channelsState) => {
    
    if (server) {
        const channels = Object.values(channelsState);
        const channelsInServer = channels.filter(channel => channel.serverId === server.id);
        
        return channelsInServer;
    }
};

export const serverInvites = (server, invitesState) => {
    if(server) {
        const invites = Object.values(Object.assign({}, invitesState));
        const invitesForServer = invites.filter(invite => invite.serverId === server.id);
        return invitesForServer;
    }
};

export const defaultChannelId = (server, channelsState) => {
    const channels = serverChannels(server, channelsState);
    for (let channel of channels) { if (channel.default) return channel.id }
};

export const chatMessages = (chat, chatType, messagesState) => {
    if (chat) {
        const messages = Object.values(messagesState);
        return messages.filter(message => {
            return (message.messageableId === chat.id) && (message.messageableType === chatType);
        });
    }
};

export const nextChat = path => {
    const splitPath = path.split("/").reverse();
    const chatId = parseInt(path.split("/").reverse()[0]);
    switch (splitPath[1]) {
        case "@me":
            return ["Conversation", chatId];
        default:
            return ["Channel", chatId];
    }
};

export const commonServers = (currUser, user, membershipsState, serversState) => {
    const mems = Object.values(membershipsState);
    const currUserServerMems = mems.filter(mem => (mem.userId === currUser.id) && (mem.joinableType === "Server"));
    const currUserServers = currUserServerMems.map(mem => serversState[mem.joinableId]);
    const currUserServersObj = {};
    for(let server of currUserServers) { currUserServersObj[server.id] = server }

    const userServerMems = mems.filter(mem => (mem.userId === user.id) && (mem.joinableType === "Server"));
    const userServers = userServerMems.map(mem => serversState[mem.joinableId]);

    return userServers.filter(server => currUserServersObj[server.id]);
};

export const commonLocalUsernameObj = (user, servers, membershipsState) => {
    const mems = Object.values(membershipsState);
    const obj = {};
    for (let server of servers) { 
        const mem = mems.find(mem => (
            (mem.userId === user.id) &&
            (mem.joinableId === server.id) &&
            (mem.joinableType === "Server")
        ));
        obj[server.id] = mem.localUsername;
    }
    return obj;
};