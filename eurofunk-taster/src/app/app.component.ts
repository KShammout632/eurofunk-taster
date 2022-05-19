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
  users: User[] = [];
  permissions: string[] = [];
  groups: Group[] = [];
  negativePermissions: string[] = [];
  userInput = new FormControl('');
  groupInput = new FormControl('');
  permissionInput = new FormControl('');

  ngOnInit(): void {
    if (localStorage.getItem('initialized')) {
      this.users = JSON.parse(localStorage.getItem('users') || '').sort(
        (a: User, b: User) => a.id > b.id
      );
      this.permissions = JSON.parse(
        localStorage.getItem('permissions') || ''
      ).sort((a: string, b: string) => a > b);
      this.groups = JSON.parse(localStorage.getItem('groups') || '').sort(
        (a: Group, b: Group) => a.name > b.name
      );
      this.negativePermissions = JSON.parse(
        localStorage.getItem('negativePermissions') || ''
      ).sort((a: string, b: string) => a > b);
    } else {
      localStorage.setItem('users', JSON.stringify([]));
      this.permissions = ['upload', 'download', 'edit'];
      localStorage.setItem('permissions', JSON.stringify(this.permissions));
      localStorage.setItem('groups', JSON.stringify([]));
      localStorage.setItem('negativePermissions', JSON.stringify([]));
      localStorage.setItem('initialized', JSON.stringify(true));
    }
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

  updateUsersData(): void {
    this.users = JSON.parse(localStorage.getItem('users') || '').sort(
      (a: User, b: User) => a.id > b.id
    );
  }

  deleteUser(userId: string): void {
    this.users = this.users.filter((u: User) => u.id != userId);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  deleteGroup(groupId: string): void {
    this.groups = this.groups.filter((g: Group) => g.id != groupId);
    localStorage.setItem('groups', JSON.stringify(this.groups));
    this.updateUsersData();
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
    this.updateUsersData();
  }

  changeGroup(data: any): void {
    const { checked, userId, groupId } = data;
    this.modifyUserInGroup(checked, userId, groupId);
  }

  uid(type: memberType): string {
    return type + Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  setNegativePermission(checked: boolean, permission: string): void {
    if (checked) {
      this.negativePermissions.push(permission);
    } else {
      this.negativePermissions = this.negativePermissions.filter(
        (p: string) => p != permission
      );
    }
    localStorage.setItem(
      'negativePermissions',
      JSON.stringify(this.negativePermissions)
    );
  }
}
