import ICommentsRepository from "./Icomments.repository";
import { IComment } from "./comments.interface";
import Comment from "./comments.interface";
import { setCurrentUser } from "../middleware/setCurrentUser";


class CommentsRepository implements ICommentsRepository {
    //Create comment
    async createComment(commentData: IComment): Promise<IComment> {
        try {
            const newComment = await Comment.create(commentData);
            return newComment;
        } catch (error) {
            throw new Error(`Error creating comment: ${error}`);
        }
    }
    //get comments for a game
    async getCommentsByGameId(gameId: string): Promise<IComment[] | null> {
        try {
            const comments = await Comment.find({ game: gameId }).populate('user').exec();
            return comments;
        } catch (error) {
            throw new Error(`Error fetching comments for game ID ${gameId}: ${error}`);
        }
    }
    //delete comment - gets comment id from commentsRouter.delete 
    async deleteComment(commentId: string): Promise<void> {
        try {
            const foundComment = await Comment.findById(commentId);
            if(req.currentUser === foundComment?.user){
                await Comment.findByIdAndDelete(commentId)
            }
            
        } catch (error) {
            throw new Error(`Error deleting comment with ID ${commentId}: ${error}`);
        }
    }
}

export default CommentsRepository