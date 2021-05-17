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

window.currentUsersMembershipId = currentUsersMembershipId;