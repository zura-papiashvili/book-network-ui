import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  PageResponseBookResponse,
  BookResponse,
} from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { FormsModule } from '@angular/forms';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [CommonModule, RouterModule, BookCardComponent],
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
})
export class MyBooksComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 3;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService
      .findAllBooksByOwner({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (books: PageResponseBookResponse) => {
          this.bookResponse = books;
          console.log(this.bookResponse);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  goToLastPage() {
    this.page = (this.bookResponse.totalPages as number) - 1;
    this.findAllBooks();
  }
  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }
  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllBooks();
  }
  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }
  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }
  get isLastPage(): boolean {
    return this.page === (this.bookResponse.totalPages as number) - 1;
  }

  editBook(book: BookResponse) {
    this.router.navigate(['/books/manage', book.id]);
  }
  shareBook(book: BookResponse) {
    this.bookService
      .updateShareableStatus({ 'book-id': book.id as number })
      .subscribe({
        next: () => {
          book.shareable = !book.shareable;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  archiveBook(book: BookResponse) {
    this.bookService
      .updateArchivedStatus({ 'book-id': book.id as number })
      .subscribe({
        next: () => {
          book.archived = !book.archived;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
