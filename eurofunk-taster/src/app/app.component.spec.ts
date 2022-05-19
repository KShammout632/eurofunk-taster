import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  beforeEach(() => {
    app = new AppComponent();
    app.resetLocalStorage();
  });

  it(`should add group`, () => {
    let localStorageGroups = app.getLocalStorageItem('groups');
    expect(localStorageGroups).toEqual([]);
    const newGroupName = 'New Group';
    app.groupInput.setValue(newGroupName);
    app.addGroup();
    expect(app.groups.length).toBe(1);
    expect(app.groups[0].name).toBe(newGroupName);
    localStorageGroups = app.getLocalStorageItem('groups');
    expect(localStorageGroups.length).toBe(1);
    expect(localStorageGroups[0].name).toBe(newGroupName);
  });

  it(`should remove group`, () => {
    let localStorageGroups = app.getLocalStorageItem('groups');
    const newGroupName = 'New Group';
    app.groupInput.setValue(newGroupName);
    app.addGroup();
    expect(app.groups.length).toBe(1);
    const group = app.groups[0];
    localStorageGroups = app.getLocalStorageItem('groups');
    expect(localStorageGroups.length).toBe(1);

    app.deleteGroup(group.id);
    expect(app.groups.length).toBe(0);
    localStorageGroups = app.getLocalStorageItem('groups');
    expect(localStorageGroups.length).toBe(0);
  });

  it(`should add user`, () => {
    let localStorageUsers = app.getLocalStorageItem('users');
    expect(localStorageUsers).toEqual([]);
    const newUserName = 'New User';
    app.userInput.setValue(newUserName);
    app.addUser();
    expect(app.users.length).toBe(1);
    expect(app.users[0].name).toBe(newUserName);
    localStorageUsers = app.getLocalStorageItem('users');
    expect(localStorageUsers.length).toBe(1);
    expect(localStorageUsers[0].name).toBe(newUserName);
  });

  it(`should remove user after adding to group`, () => {
    let localStorageUsers = app.getLocalStorageItem('users');
    const newUserName = 'New User';
    app.userInput.setValue(newUserName);
    app.addUser();
    app.groupInput.setValue('New Group');
    app.addGroup();
    expect(app.users.length).toBe(1);
    const user = app.users[0];
    const group = app.groups[0];
    localStorageUsers = app.getLocalStorageItem('users');
    expect(localStorageUsers.length).toBe(1);

    app.modifyUserInGroup(true, user.id, group.id);
    expect(app.groups[0].userIds.includes(user.id));

    app.deleteUser(user.id);
    expect(app.groups[0].userIds).not.toContain(user.id);
    expect(app.users.length).toBe(0);
    localStorageUsers = app.getLocalStorageItem('users');
    expect(localStorageUsers.length).toBe(0);
  });
});
