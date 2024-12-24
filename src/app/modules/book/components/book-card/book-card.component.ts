import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  private _book: BookResponse = {};
  private _bookCover: string | undefined;
  private _manage: boolean = false;

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  get book(): BookResponse {
    return this._book;
  }

  get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64,' + this._book.cover;
    }
    // Use a random seed for a unique image each time
    const randomSeed = Math.random().toString(36).substring(2, 8); // Generates a random string
    return `https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg`;
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  @Output() private share: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();

  @Output() private edit: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();

  @Output() private archive: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();

  @Output() private addToWaitingList: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();

  @Output() private borrow: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();

  @Output() private showDetails: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();

  onEdit() {
    this.edit.emit(this._book);
  }
  onShare() {
    this.share.emit(this._book);
  }
  onArchive() {
    this.archive.emit(this._book);
  }
  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);
  }

  onShowDetails() {
    this.showDetails.emit(this._book);
  }
}
