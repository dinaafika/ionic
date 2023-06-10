import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  countrycode: string = "62";
  wanumber: string = "85693108104";
  whatsappUrl: string = "https://wa.me/";
  telegramUrl: string = "https://t.me/";
  email: string = "dinahartini6983@gmail.com";

  name: string = "";
  kelas: string = "";
  message: string = "";
  sendTo: string = "";
  telegramUsername: string = "gddvg";

  latitude: number = 0;
  longitude: number = 0;

  constructor() {}

  sendMessage() {
    let directUrl = "";

    if (this.sendTo === "whatsapp") {
      const whatsappMessage = `Hi, my name is ${this.name}. kelas: ${this.kelas}. ${this.message}`;
      const encodedWhatsappMessage = encodeURIComponent(whatsappMessage);
      directUrl = `${this.whatsappUrl}${this.countrycode}${this.wanumber}?text=${encodedWhatsappMessage}`;
    } else if (this.sendTo === "telegram") {
      const telegramMessage = `Halo nama saya ${this.name}. kelas: ${this.kelas}. ${this.message}`;
      directUrl = `${this.telegramUrl}${this.telegramUsername}?text=${encodeURIComponent(telegramMessage)}`;
    } else if (this.sendTo === "email") {
      const subject = `Message from ${this.name}`;
      const emailLink = `mailto:${this.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(this.message)}`;
      window.location.href = emailLink;
    }

    if (directUrl !== "") {
      window.open(directUrl, '_blank');
    }

    // Simpan data ke localStorage
    const formData = {
      name: this.name,
      kelas: this.kelas,
      message: this.message,
      latitude: this.latitude,
      longitude: this.longitude
    };
    this.saveFormData(formData);
  }

  saveFormData(formData: {
    name: string,
    kelas :string,
    message: string,
    latitude: number,
    longitude: number
  }) {
    const storedData = localStorage.getItem('formData');
    let savedData: {
      name: string,
      kelas : string,
      message: string,
      latitude: number,
      longitude: number
    }[] = [];

    if (storedData) {
      savedData = JSON.parse(storedData);
    }

    savedData.push(formData);
    localStorage.setItem('formData', JSON.stringify(savedData));
  }

  trackLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }, (error) => {
        console.log('Error getting location:', error);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
}
