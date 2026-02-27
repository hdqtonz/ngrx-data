import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { map, Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-post',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './single-post.html',
  styleUrl: './single-post.scss',
})
export class SinglePost implements OnInit {
  // inject
  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);

  public post$: Observable<Post>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.post$ = this.postsService.getByKey(id).pipe(map((post) => post));
    // this.post$ = this.postsService.entities$.pipe(map((posts) => posts.find((p) => p.id === +id)));
  }
}
