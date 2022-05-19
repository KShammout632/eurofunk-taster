import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../group';
import { User } from '../user';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css'],
})
export class UserRowComponent implements OnInit {
  @Input() user: User;
  @Input() permissions: string[];
  @Input() negativePermissions: string[];
  @Input() groups: Group[];
  @Output() deleteUser: EventEmitter<any> = new EventEmitter();
  groupPermissions = new Set();

  constructor() {}

  ngOnInit(): void {
    this.getPermissions();
  }

  getPermissions(): void {
    const userGroups = this.groups?.filter((g: Group) =>
      g.userIds.includes(this.user.id)
    );
    userGroups?.map((g: Group) =>
      g.permissions.map((p: string) => this.groupPermissions.add(p))
    );
  }

  permissionFromGroup(permission: string): boolean {
    return this.groupPermissions.has(permission);
  }

  negativePermission(permission: string): boolean {
    return this.negativePermissions.includes(permission);
  }

  setPermission(checked: boolean, permission: string): void {
    const localStorageData = JSON.parse(localStorage.getItem('users') || '');
    const cleanedData = localStorageData.filter(
      (u: User) => u.id != this.user.id
    );
    if (checked) {
      if (!this.user.permissions.includes(permission)) {
        this.user.permissions.push(permission);
      }
    } else {
      const index = this.user.permissions.indexOf(permission);
      if (index > -1) {
        this.user.permissions.splice(index, 1);
      }
    }
    cleanedData.push(this.user);
    localStorage.setItem('users', JSON.stringify(cleanedData));
  }

  handleDeleteUser(): void {
    this.deleteUser.emit(this.user.id);
  }
}
