import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.scss',
})
export class PostsList implements OnInit {
  // inject the PostsService
  private postsService = inject(PostsService);

  public posts$: Observable<Post[]>;

  ngOnInit(): void {
    this.posts$ = this.postsService.entities$;
  }

  editPost(id: number): void {
    // Navigate to the edit page for the selected post
  }

  deletePost(id: any): void {
    // Call the service to delete the selected post
    this.postsService.delete(id);
  }
}
