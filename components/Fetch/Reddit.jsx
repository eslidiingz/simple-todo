import { useQuery } from "react-query";

const Reddit = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery("posts", fetchPosts, {
    retry: false,
  });

  function fetchPosts() {
    return fetch(`https://www.reddit.com/r/Genshin_Impact_Leaks.json`).then(
      (res) => res.json()
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Reddit API</h2>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <ul className="list-decimal pl-8 mb-4">
          {posts?.data?.children?.map((post) => (
            <li key={post?.data?.id}>
              <a
                href={`https://reddit.com${post?.data?.permalink}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-800 hover:text-red-600"
              >
                {post?.data?.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {isError && <div>{error?.message}</div>}
    </>
  );
};

export default Reddit;
