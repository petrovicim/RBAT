import { NgModule } from '@angular/core';
import {
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    exports: [
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatTooltipModule,
    ],
})

export class MaterialModule { }
