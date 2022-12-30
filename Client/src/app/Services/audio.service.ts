import { Injectable } from '@angular/core';
import * as THREE from "three";

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  listener:THREE.AudioListener;
  dest:THREE.Audio;
  defaultVolume:number;
  currentVolume:number;
  time: THREE.Clock;

  constructor()
  {
    this.listener = new THREE.AudioListener();
    this.dest = new THREE.Audio(this.listener);
    this.defaultVolume = 0.5;
    this.currentVolume = this.defaultVolume;
    this.time = new THREE.Clock();
  }
  loadAudio(url:string)
  {
    let loader = new THREE.AudioLoader();
    loader.load(url, (buffer) => {
      this.dest.setBuffer(buffer);
      this.dest.setLoop(true);
      this.dest.setVolume(this.defaultVolume);
    });
  }

  play()
  {
    this.dest.setVolume(0);
    this.dest.play();
    this.fadein();
  }

  pause()
  {
    setTimeout(()=>{
      this.dest.pause();
    }, 850);

    this.time.start();
    this.fadeout();
  }

  stop()
  {
    this.fadeout();


  }

  setVolume(value:number)
  {
    this.dest.setVolume(value);
    this.currentVolume = value;
  }

  fadeout()
  {
    if(this.dest.getVolume() >= 0)
    {
      this.dest.setVolume(this.dest.getVolume() - 0.02);
      setTimeout(()=>{
        this.fadeout();
      }, 1);
    }
    else {
      console.log(this.time.getElapsedTime());
      this.dest.setVolume(0);
    }
  }

  fadein()
  {
    if(this.dest.getVolume() <= this.currentVolume)
    {
      this.dest.setVolume(this.dest.getVolume() + 0.02);
      setTimeout(()=>{
        this.fadein();
      }, 1);
    }
    else {
      this.dest.setVolume(this.currentVolume);
      //console.log(this.time.getElapsedTime());
    }
  }
}
