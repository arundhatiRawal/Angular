import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RealTimeComponent} from './real-time/real-time.component';
import {HomeComponent} from './home/home.component';
import {CpuComponent} from './cpu/cpu.component';
import {DiskComponent} from './disk/disk.component';
import {MemoryComponent} from './memory/memory.component';
import {TopDiskComponent} from './top-disk/top-disk.component';
import {TopMemoryComponent} from './top-memory/top-memory.component';
import {HistoricComponent} from './historic/historic.component';
import { PowerComponent } from './power/power.component';
import { ChartDisplayComponent } from './chart-display/chart-display.component';

const routes: Routes = [
  {path:"",redirectTo:'home',pathMatch:'full'},
  { path: 'realTime', component: RealTimeComponent  },
  { path: 'home', component: HomeComponent  },
  { path: 'cpu', component: CpuComponent  },
  { path: 'disk', component: DiskComponent  },
  { path: 'memory', component: MemoryComponent  },
  { path: 'disklist', component: TopDiskComponent  },
  { path: 'memorylist', component: TopMemoryComponent  },
  { path: 'historic', component: HistoricComponent},
  { path: 'power', component: PowerComponent},
  { path: 'chartDisplay', component: ChartDisplayComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
