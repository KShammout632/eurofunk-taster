import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Group } from '../group';
import { User } from '../user';

@Component({
  selector: 'app-group-row',
  templateUrl: './group-row.component.html',
  styleUrls: ['./group-row.component.css'],
})
export class GroupRowComponent implements OnInit {
  @Input() group: Group;
  @Input() permissions: string[];
  @Input() negativePermissions: string[];
  @Input() users: User[];
  @Output() deleteGroup: EventEmitter<any> = new EventEmitter();
  @Output() changeGroup: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  negativePermission(permission: string): boolean {
    return this.negativePermissions.includes(permission);
  }

  setPermission(checked: boolean, permission: string): void {
    const localStorageData = JSON.parse(localStorage.getItem('groups') || '');
    const cleanedData = localStorageData.filter(
      (g: Group) => g.id != this.group.id
    );
    if (checked) {
      if (!this.group.permissions.includes(permission)) {
        this.group.permissions.push(permission);
      }
    } else {
      const index = this.group.permissions.indexOf(permission);
      if (index > -1) {
        this.group.permissions.splice(index, 1);
      }
    }
    cleanedData.push(this.group);
    localStorage.setItem('groups', JSON.stringify(cleanedData));
  }

  setUser(checked: boolean, id: string): void {
    this.changeGroup.emit({ userId: id, groupId: this.group.id, checked });
  }

  handleDeleteGroup(): void {
    this.deleteGroup.emit(this.group.id);
  }
}
