import { formatDistanceStrict } from "date-fns";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";

const IssueComments = ({ issueNumber }) => {
  const { isLoading, isSuccess, data: comments } = useQuery(["comments", issueNumber], fetchComment);

  function fetchComment() {
    return fetch(`https://api.github.com/repos/facebook/create-react-app/issues/${issueNumber}/comments`).then(
      (response) => response.json()
    );
  }

  return (
    <>
      {isSuccess &&
        comments.map((comment) => (
          <div className="flex mt-4" key={comment?.id}>
            <a href={comment?.user?.html_url}>
              <img src={comment?.user?.avatar_url} alt="user avatar" className="max-w-12 max-h-12 rounded-full" />
            </a>

            <div className="border border-gray-400 grow ml-4 rounded overflow-hidden">
              <div className="py-3 px-4 bg-gray-200">
                <a href={comment?.user?.html_url} className="font-semibold text-gray-600 hover:text-blue-700">
                  {comment?.user?.login}{" "}
                </a>
                commented{" "}
                {formatDistanceStrict(new Date(comment?.created_at), new Date(), {
                  addSuffix: true,
                })}
              </div>
              <div className="p-4 markdown-body">
                {/* <ReactMarkdown children={comment?.body} /> */}
                <ReactMarkdown>{comment?.body}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default IssueComments;
