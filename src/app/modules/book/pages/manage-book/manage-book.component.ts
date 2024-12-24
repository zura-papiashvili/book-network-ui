import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookRequest } from '../../../../services/models';
import { BookService } from '../../../../services/services/book.service';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss',
})
export class ManageBookComponent {
  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedBookCover: any;
  bookRequest: BookRequest = {
    title: '',
    isbn: '',
    synopsis: '',
    authorName: '',
  };

  constructor(private bookService: BookService, private router: Router) {}

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
          });
      },
      error: (error) => {
        this.errorMsg = error.error.validationErrors;
      },
    });
  }
}
