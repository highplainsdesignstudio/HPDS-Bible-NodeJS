import { Component, OnInit } from '@angular/core';
import { GetbibleService } from '../getbible.service';

@Component({
  selector: 'app-bible-details',
  templateUrl: './bible-details.component.html',
  styleUrls: [
    './bible-details.component.css' ]
})
export class BibleDetailsComponent implements OnInit {

  constructor(private getbibleService: GetbibleService) { }

  bibleDetails;
  currentBook = "Genesis";
  currentBookChapterCount = null;;
  currentChapter = "1";
  currentVersion;
  chapterCount;
  bibleBooks = {
    'Old Testament': null,
    'New Testament': null
  };
  page = null;
  verses = null;
  versions = null;

  ngOnInit() {
    // Upon initialization, getDetails() gets bible details to populate the bible text.
    this.getbibleService.getDetails()
      .subscribe(resp => {
        this.bibleBooks = resp['books'];
        this.versions = resp['versions'];
        this.chapterCount = resp['chapterCount'];
        this.currentVersion = this.versions[0];
        this.generateBookChapterCount(this.currentBook);
        this.updateBible();
      });
  }
  
  chooseBook (event: any) {
    this.currentBook = event.target.value;
    this.generateBookChapterCount(this.currentBook);
    this.updateBible();
  }

  chooseChapter (event: any) {
    this.currentChapter = event.target.value;
    this.updateBible();
  }

  chooseVersion(event: any) {
    this.currentVersion = event.target.value;
    this.updateBible();
  }

  generateBookChapterCount(book: string) {
    const x = this.chapterCount[book];
    this.currentBookChapterCount = [];
    for (var i = 1; i <= x; i++) {
      this.currentBookChapterCount.push(i.toString());
    }

    /** When books change, the previous selected book may have had more chapters
     * than the newly selected book. If that is the case, the currentChapter
     * needs to be updated so that there is not a glitch when the chapters appear
     * for selection.
     */
    if (this.currentChapter > x) {
      this.currentChapter = (this.currentBookChapterCount.length).toString();
    }
  }

  nextChapter() {
    if (this.currentChapter != this.currentBookChapterCount.length.toString()) {
      this.currentChapter = (parseInt(this.currentChapter) + 1).toString();
      this.updateBible();
    }
  }

  previousChapter() {
    if (this.currentChapter != "1") {
      this.currentChapter = (parseInt(this.currentChapter) - 1).toString();
      this.updateBible();
    }
  }

  updateBible() {
    this.getbibleService.bible = {
      version: this.currentVersion,
      book: this.currentBook,
      chapter: this.currentChapter
    }
    console.log(this.getbibleService.bible);
    this.getbibleService.getChapter()
      .subscribe(resp => {
        // console.log(resp); // kept b/c of excess info returned from server.
        this.verses = Object.keys(resp['bible']);
        this.page = resp['bible'];
        console.log(this.verses);
      });
  }
}
