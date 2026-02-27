import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-posts-list',
  imports: [AsyncPipe],
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
}
