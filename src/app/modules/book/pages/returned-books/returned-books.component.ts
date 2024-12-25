import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services/book.service';
import { PageResponseBorrowedBookResponse } from '../../../../services/models/page-response-borrowed-book-response';
import { BorrowedBookResponse } from '../../../../services/models/borrowed-book-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-returned-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './returned-books.component.html',
  styleUrl: './returned-books.component.scss',
})
export class ReturnedBooksComponent implements OnInit {
  returnedBooks: PageResponseBorrowedBookResponse = {};
  page: number = 0;
  size: number = 5;
  message: string = '';
  level: string = 'success';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }
  findAllReturnedBooks() {
    this.bookService
      .findAllReturnedBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (response) => {
          this.returnedBooks = response;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  goToLastPage() {
    this.page = (this.returnedBooks.totalPages as number) - 1;
    this.findAllReturnedBooks();
  }
  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }
  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllReturnedBooks();
  }
  goToPreviousPage() {
    this.page--;
    this.findAllReturnedBooks();
  }
  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }
  get isLastPage(): boolean {
    return this.page === (this.returnedBooks.totalPages as number) - 1;
  }

  approveReturnedBook(book: BorrowedBookResponse) {
    if (!book.returned) {
      this.level = 'error';
      this.message = 'Book is not returned yet';
      return;
    }
    this.bookService
      .approveReturn({
        'book-id': book.id as number,
      })
      .subscribe({
        next: (response) => {
          this.level = 'success';
          this.message = 'Book Returned Approved';
          this.findAllReturnedBooks();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
