import { IComment } from "./comments.interface";

interface ICommentsRepository {
    createComment(commentData: IComment): Promise<IComment>;
    getCommentsByGameId(gameId: string): Promise<IComment[] | null>;
    getCommentById(commentId: string): Promise<IComment | null>;
    deleteComment(commentId: string): Promise<void>;
}

export default ICommentsRepository