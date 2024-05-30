import ICommentsRepository from "./Icomments.repository";
import { IComment } from "./comments.interface";
import Comment from "./comments.interface";

class CommentsRepository implements ICommentsRepository {
    async createComment(commentData: IComment): Promise<IComment> {
        try {
            const newComment = await Comment.create(commentData);
            return newComment;
        } catch (error) {
            throw new Error(`Error creating comment: ${error}`);
        }
    }
    async getCommentsByGameId(gameId: string): Promise<IComment[] | null> {
        try {
            const comments = await Comment.find({ game: gameId }).populate('user').exec();
            return comments;
        } catch (error) {
            throw new Error(`Error fetching comments for game ID ${gameId}: ${error}`);
        }
    }
    
    async deleteComment(commentId: string): Promise<void> {
        try {
            await Comment.findByIdAndDelete(commentId);
        } catch (error) {
            throw new Error(`Error deleting comment with ID ${commentId}: ${error}`);
        }
    }
}

export default CommentsRepository