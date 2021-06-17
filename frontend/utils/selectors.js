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
}

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

export const commonServers = (user1, user2, membershipsState, serversState) => {
    const mems = Object.values(membershipsState);
    const user1ServerMems = mems.filter(mem => (mem.userId === user1.id) && (mem.joinableType === "Server"));
    const user1Servers = user1ServerMems.map(mem => serversState[mem.joinableId]);
    const user1ServersObj = {};
    for(let server of user1Servers) { user1ServersObj[server.id] = server }

    const user2ServerMems = mems.filter(mem => (mem.userId === user2.id) && (mem.joinableType === "Server"));
    const user2Servers = user2ServerMems.map(mem => serversState[mem.joinableId]);

    return user2Servers.filter(server => user1ServersObj[server.id]);
};

export const commonServerLocalUsernames = (user1, user2, membershipsState, serversState) => {
    const mutualServers = commonServers(user1, user2, membershipsState, serversState);
    const mutualServerIds = mutualServers.map(server => server.id);
    const mems = Object.values(membershipsState);
    const user2ServerMems = mems.filter(mem => (mem.userId === user2.id) && (mem.joinableType === "Server"));
    // return mutualServerIds.map(id => {
    //     for (let mem of user2ServerMems) {
    //         if (mem.joinableId === id) {
    //             if (!mem.localUsername) {
                    
    //                 return user2.username;
    //             } else {

    //             }
    //         }
    //     }
    // });
};