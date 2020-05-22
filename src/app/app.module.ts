import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RealTimeComponent } from './real-time/real-time.component';
import { MemoryComponent } from './memory/memory.component';
import { DiskComponent } from './disk/disk.component';
import { CpuComponent } from './cpu/cpu.component';
import { TopDiskComponent } from './top-disk/top-disk.component';
import { TopMemoryComponent } from './top-memory/top-memory.component';
import { DisplayHostnameComponent } from './display-hostname/display-hostname.component';
import { HistoricComponent } from './historic/historic.component';
import { HomeService } from './home/home.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayHostnameService } from './display-hostname/display-hostname.service';
import { CpuService } from './cpu/cpu.service';
import { DiskService } from './disk/disk.service';
import { MemoryService } from './memory/memory.service';
import { TopRamService } from './top-memory/top-memory.service';
import { TopDiskService } from './top-disk/top-disk.service';
import { PowerComponent } from './power/power.component';
import { PowerService } from './power/power.service';
import { ChartDisplayComponent } from './chart-display/chart-display.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import {ChartDisplayService} from './chart-display/chart-display.service'
import { DateTimeService, LineSeriesService, DateTimeCategoryService, StripLineService} from '@syncfusion/ej2-angular-charts';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RealTimeComponent,
    MemoryComponent,
    DiskComponent,
    CpuComponent,
    TopDiskComponent,
    TopMemoryComponent,
    DisplayHostnameComponent,
    HistoricComponent,
    PowerComponent,
    ChartDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [ChartDisplayService,HomeService,DisplayHostnameService,CpuService,DiskService,MemoryService,TopRamService,TopDiskService, PowerService,DateTimeService, LineSeriesService, DateTimeCategoryService, StripLineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
