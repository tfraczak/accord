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

export const chatMessages = (chat, chatType, messagesState) => {
    if (chat) {
        const messages = Object.values(messagesState);
        return messages.filter(message => {
            return (message.messageableId === chat.id) && (message.messageableType === chatType);
        });
    }
};