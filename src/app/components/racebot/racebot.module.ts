import { NgModule } from '@angular/core';
import { RacebotRecentRacesComponent } from './subcomponents';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ RacebotRecentRacesComponent ],
    exports: [ RacebotRecentRacesComponent ],
    imports: [ CommonModule ]
})

export class RacebotModule {}
