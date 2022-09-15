import { Link, useParams } from 'react-router-dom'
import { useGetPostsByUserIdQuery } from '../posts/postsSlice'
import { useGetUsersQuery } from '../users/usersSlice'

const UserPage = () => {
    const { userId } = useParams()

    const { user,
        isLoading: isLoadingUser,
        isSuccess: isSuccessUser,
        isError: isErrorUser,
        error: errorUser
    } = useGetUsersQuery('getUsers', {
        selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
            user: data?.entities[userId],
            isLoading,
            isSuccess,
            isError,
            error
        }),
    })

    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery(userId);

    let content;
    if (isLoading || isLoadingUser) {
        content = <p>Loading...</p>
    } else if (isSuccess && isSuccessUser) {
        const { ids, entities } = postsForUser
        content = (
            <section>
                <h2>{user?.name}</h2>
                <ol>
                    {ids.map(id => (
                        <li key={id}>
                            <Link to={`/post/${id}`}>{entities[id].title}</Link>
                        </li>
                    ))}
                </ol>
            </section>
        )
    } else if (isError || isErrorUser) {
        content = <p>{error || errorUser}</p>;
    }

    return content
}

export default UserPage