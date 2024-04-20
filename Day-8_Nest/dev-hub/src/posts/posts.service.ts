import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Posts } from 'src/schemas/posts.schema';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UserPostService } from 'src/user-post/user-post.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postsModel: Model<Posts>,
    private userPostService: UserPostService,
  ) {}

  //getting all posts
  async getPosts(): Promise<Posts[]> {
    // const aggregate = [];
    // aggregate.push({
    //   $lookup: {
    //     from: 'postcomments',
    //     localField: '_id',
    //     foreignField: 'postId',
    //     as: 'comments',
    //   },
    // });
    // aggregate.push({ $unwind: '$comments' });

    const postDetails = await this.postsModel
      .aggregate([
        {
          $lookup: {
            from: 'postcomments',
            let: { p_id: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$postId', '$$p_id'] } } },
              {
                $lookup: {
                  from: 'comments',
                  let: { c_id: '$commentId' },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$_id', '$$c_id'] },
                      },
                    },
                  ],
                  as: 'comments',
                },
              },
            ],
            as: 'commentsinfo',
          },
        },
        {
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'postId',
            as: 'reactions',
          },
        },
        // {
        //   $unwind: '$reactions',
        // },
        // {
        //   $unwind: { path: '$commentsinfo', preserveNullAndEmptyArrays: true },
        // },
        // {
        //   $unwind: {
        //     path: '$commentsinfo.comments',
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $project: {
            _id: 0,
            postId: '$_id',
            title: 1,
            description: 1,
            comments: {
              commentId: '$commentsinfo.comments._id',
              comment: '$commentsinfo.comments.comment',
            },
          },
        },
        // {
        //   $group: {
        //     _id: { postId: '$postId' },
        //     title: { $addToSet: '$title' },
        //     description: { $addToSet: '$description' },
        //     comments: { $push: '$comments' },
        //   },
        // },
      ])
      .exec();
    console.log(postDetails.map((item) => item?.comments?.commentId));
    console.log(postDetails);
    return await this.postsModel.find().exec();
  }

  async createPost(
    createPostsDto: CreatePostsDto,
    userId: mongoose.Types.ObjectId,
  ): Promise<Posts> {
    const createdPost = await this.postsModel.create(createPostsDto);
    const userPost = {
      userId: new mongoose.Types.ObjectId(userId),
      postId: createdPost._id,
    };
    this.userPostService.createUserPost(userPost);
    return createdPost;
  }

  async updatePost() {}

  async getPostById() {}

  async deletePost() {}

  async getUsersWhoReactThePost() {}
}
