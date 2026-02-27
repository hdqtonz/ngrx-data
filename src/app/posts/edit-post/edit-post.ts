import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-edit-post',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.scss',
})
export class EditPost implements OnInit {
  // inject
  private _postsService = inject(PostsService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  public editPostForm: FormGroup;
  public id: string;
  public post: Post;

  ngOnInit(): void {
    this.createEditPostForm();
    this.fetchPostDetails();
    // Get the post ID from the route parameters
    // Fetch the post details using the service and populate the form
  }

  fetchPostDetails(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this._postsService.getByKey(this.id).subscribe((data) => {
      this.post = data;
      if (this.post) {
        this.patchFormValues(this.post.title, this.post.body);
      }
    });
  }

  createEditPostForm(): void {
    this.editPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }

  patchFormValues(title: string, body: string): void {
    this.editPostForm.patchValue({
      title,
      body,
    });
  }

  onSubmit(): void {
    if (this.editPostForm.invalid) {
      return;
    }

    // Call the service to update the post details
    this._postsService
      .update({
        id: Number(this.id),
        title: this.editPostForm.value.title,
        body: this.editPostForm.value.body,
        userId: this.post.userId,
      })
      .subscribe(() => {
        // success
        this._router.navigate(['/posts']);
      });
  }
}
