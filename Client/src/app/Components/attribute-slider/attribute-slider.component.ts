import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SessionValuesService} from "../../Services/session-values.service";
import {MatSlider} from "@angular/material/slider";

@Component({
  selector: 'attribute-slider',
  templateUrl: './attribute-slider.component.html',
  styleUrls: ['./attribute-slider.component.css'],
})
export class AttributeSlider {
  @Input() attributeName: string;
  value:number;
  target:number;

  constructor(private sessionValues: SessionValuesService) {
    this.attributeName = "";
    this.value = 0;
    this.target = 0;
  }

  ngAfterViewInit(){
    this.sessionValues.sliderReset.subscribe(sliderReset => {
      if(sliderReset)
      {
        this.reset(this.value, 1, 20);
      }
    });
  }

  reset(val:number, decTime:number, decRate:number)
  {
    if(val > 0)
    {
      this.emitValue(val);
      val -= decRate;
      this.value -= decRate;
      setTimeout(()=>{
        this.reset(val, decTime, decRate);
      }, decTime);
    }
  }

  emitValue(value:number, event?:any)
  {
    if(event)
    {
      value = event.value;
    }

    if(this.attributeName == "Clarity")
    {
      this.sessionValues.updateClarity(value/2000);
    }
    else if(this.attributeName == "Width")
    {
      this.sessionValues.updateWidth(value/1000 + 1);
    }
    else if(this.attributeName == "Depth")
    {
      this.sessionValues.updateDepth(value/1000 + 1);
    }
    else if(this.attributeName == "Immersion")
    {
      this.sessionValues.updateImmersion(value/200 + 1);
    }
  }
}
