import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookRequest, BookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services/book.service';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss',
})
export class ManageBookComponent implements OnInit {
  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedBookCover: any;
  bookRequest: BookRequest = {
    title: '',
    isbn: '',
    synopsis: '',
    authorName: '',
  };

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['id'];
    if (bookId) {
      this.bookService.findBookById({ 'book-id': bookId }).subscribe({
        next: (book: BookResponse) => {
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            authorName: book.authorName as string,
            shareable: book.shareable,
          };
          this.selectedPicture = book.cover
            ? `data:image/jpg;base64,${book.cover}`
            : 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
        },
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.saveBook({ body: this.bookRequest }).subscribe({
      next: (response) => {
        if (this.selectedBookCover) {
          // If a book cover is provided, upload it
          this.bookService
            .uploadBookCover({
              'book-id': response,
              body: {
                cover: this.selectedBookCover,
              },
            })
            .subscribe({
              next: () => {
                this.router.navigate(['/books/my-books']);
              },
              error: (error) => {
                this.errorMsg = error.error.validationErrors; // Handle upload errors
              },
            });
        } else {
          // If no book cover, directly navigate
          this.router.navigate(['/books/my-books']);
        }
      },
      error: (error) => {
        this.errorMsg = error.error.validationErrors; // Handle save errors
      },
    });
  }
}
