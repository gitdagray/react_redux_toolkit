import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from './postsSlice';

const PostsList = () => {
    const {
        postsIds,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('getPosts', {
        selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
            postsIds: data?.ids,
            isLoading,
            isSuccess,
            isError,
            error,
        }),
    })

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = postsIds?.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default PostsList