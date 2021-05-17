export const addLocalUsername = (user, membership) => (
    Object.assign({}, user, { localUsername: membership.localUsername})
);

export const serverMembers = (users, memberships) => {
    let members = Object.values(users).filter(user => memberships[user.id]);
    let membersWithLocalUsernames = [];
    for (let member of members) {
        const memberWithLocalUsername = addLocalUsername(member, memberships[member.id]);
        membersWithLocalUsernames.push(memberWithLocalUsername);
    }
    return membersWithLocalUsernames;
};

window.serverMembers = serverMembers;
