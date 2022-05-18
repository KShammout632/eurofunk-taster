import { Component } from '@angular/core';
import { User } from './user';
import { FormControl } from '@angular/forms';
import { Group } from './group';

type memberType = 'group' | 'user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eurofunk-taster';
  users = JSON.parse(localStorage.getItem('users') || '').sort(
    (a: User, b: User) => a.id > b.id
  );
  permissions = JSON.parse(localStorage.getItem('permissions') || '').sort(
    (a: string, b: string) => a > b
  );
  groups = JSON.parse(localStorage.getItem('groups') || '').sort(
    (a: Group, b: Group) => a.name > b.name
  );
  // users = [];
  // permissions = [];
  // groups = [];
  userInput = new FormControl('');
  groupInput = new FormControl('');
  permissionInput = new FormControl('');

  ngOnInit(): void {
    // localStorage.setItem(
    //   'users',
    //   JSON.stringify([
    //     { id: 1, name: 'User 1', permissions: ['upload', 'download'] },
    //     { id: 2, name: 'User 2', permissions: ['download', 'edit'] },
    //   ])
    // );
    // localStorage.setItem(
    //   'permissions',
    //   JSON.stringify(['upload', 'download', 'edit'])
    // );
    // localStorage.setItem(
    //   'groups',
    //   JSON.stringify([
    //     { id: 1, name: 'managers', userIds: [1] },
    //     { id: 2, name: 'users', userIds: [1, 2] },
    //     { id: 3, name: 'developers', userIds: [] },
    //   ])
    // );
  }

  addUser(): void {
    this.users.push({
      id: this.uid('user'),
      name: this.userInput.value,
      permissions: [],
    });
    localStorage.setItem('users', JSON.stringify(this.users));
    this.userInput.setValue('');
  }

  addGroup(): void {
    this.groups.push({
      id: this.uid('group'),
      name: this.groupInput.value,
      userIds: [],
      permissions: [],
    });
    localStorage.setItem('groups', JSON.stringify(this.groups));
    this.groupInput.setValue('');
  }

  addPermission(): void {
    this.permissions.push(this.permissionInput.value);
    localStorage.setItem('permissions', JSON.stringify(this.permissions));
    this.permissionInput.setValue('');
  }

  deleteUser(userId: string): void {
    this.users = this.users.filter((u: User) => u.id != userId);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  deleteGroup(groupId: string): void {
    this.groups = this.groups.filter((g: Group) => g.id != groupId);
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  modifyUserInGroup(checked: boolean, userId: string, groupId: string): void {
    const cleanedData = this.groups.filter((g: Group) => g.id != groupId);
    const modifiedGroup = this.groups.filter((g: Group) => g.id === groupId)[0];
    if (checked) {
      if (!modifiedGroup.userIds.includes(userId)) {
        modifiedGroup.userIds.push(userId);
      }
    } else {
      const index = modifiedGroup.userIds.indexOf(userId);
      if (index > -1) {
        modifiedGroup.userIds.splice(index, 1);
      }
    }
    cleanedData.push(modifiedGroup);
    localStorage.setItem('groups', JSON.stringify(cleanedData));
  }

  changeGroup(data: any): void {
    const { checked, userId, groupId } = data;
    this.modifyUserInGroup(checked, userId, groupId);
  }

  uid(type: memberType): string {
    return type + Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
}
