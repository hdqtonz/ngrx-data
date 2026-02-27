import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  imports: [ReactiveFormsModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.scss',
})
export class AddPost implements OnInit {
  // inject
  private postsService = inject(PostsService);
  private router = inject(Router);
  public postForm: FormGroup;

  ngOnInit(): void {
    this.createPostForm();
  }

  createPostForm(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const title = this.postForm.value.title;
      const body = this.postForm.value.body;

      const requestBody = {
        title,
        body,
        userId: 1,
      };

      console.log('Request Body:', requestBody);

      // Call the service to add the new post
      this.postsService.add(requestBody).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    }
  }
}
