import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ImdbServiceService } from './imdb-service.service';
import {ImdbArtist, ImdbArtistRsp} from './imdbartist';

@Component({
  selector: 'app-imdbartist',
  templateUrl: './imdbartist.component.html',
  styleUrls: ['./imdbartist.component.css']
})
export class ImdbartistComponent implements OnInit {

  toggleImdbArtist: boolean;
  toggleImdbTitle: boolean;
  artistName: string;
  artistNconst: string;
  imdbService: ImdbServiceService;
  artistInfo: ImdbArtistRsp[];

  constructor(imdbService: ImdbServiceService) {
    this.toggleImdbArtist = false;
    this.toggleImdbTitle = false;
    this.artistName = undefined;
    this.artistNconst = undefined;
    this.imdbService = imdbService;
    this.artistInfo = undefined;
  }

  ngOnInit(): void {
  }

  toggleCard(cardId): void {
    if (cardId == 'artist') {
      this.toggleImdbArtist = !this.toggleImdbArtist;
    }
    if (cardId == 'title') {
      this.toggleImdbTitle = !this.toggleImdbTitle;
    }
  }

  setArtistInfo(theArtists: ImdbArtistRsp): void {
    console.log("Artists = \n" + JSON.stringify(theArtists, null, 2));
    let links = theArtists.links;
    for (let i = 0; i < links.length; i++) {
      let l = links[i]
      if (l.rel == "primaryProfession") {
        theArtists.data.primaryProfession = l.href;
      }
    }
    this.artistInfo = [theArtists];
  }


  onSomethingInput(e: Event) : void {
    // console.log("Input = ", (<HTMLInputElement> e.target).value);
    this.artistNconst = (<HTMLInputElement> e.target).value;
    if (this.artistNconst.length > 5) {
      this.imdbService.getArtists(this.artistNconst)
        .subscribe((data) => this.setArtistInfo(data));
    }
  }

  onLookup(): void {
    if (this.artistNconst.length > 5) {
      this.imdbService.getArtists(this.artistNconst)
        .subscribe((data) => this.setArtistInfo(data));
    }
  }

}
