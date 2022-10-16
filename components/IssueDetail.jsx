import { formatDistanceStrict } from "date-fns";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import IconLoading from "./Icon/IconLoading";
import IssueComments from "./IssueComments";

const IssueDetail = ({ issueNumber }) => {
  const { isLoading, isSuccess, data: issue } = useQuery(["issue", issueNumber], fetchIssue);

  function fetchIssue() {
    return fetch(`https://api.github.com/repos/facebook/create-react-app/issues/${issueNumber}`).then((response) =>
      response.json()
    );
  }

  return (
    <>
      {isLoading && (
        <div className="text-center p-4">
          <IconLoading /> Loading...
        </div>
      )}

      {isSuccess && (
        <div className="container max-w-screen-lg mx-auto mt-8">
          <h2 className="text-2xl font-semibold">
            {issue?.title} <span className="font-normal text-gray-500 text-xl">#{issueNumber}</span>
          </h2>
          <div className="mt-2">
            <a href={issue?.user?.html_url} className="font-semibold text-gray-600 hover:text-blue-700">
              {issue?.user?.login}{" "}
            </a>

            <span className="text-gray-500">
              open this issue{" "}
              {formatDistanceStrict(new Date(issue?.created_at), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>

          <div className="flex mt-4">
            <img src={issue?.user?.avatar_url} alt="user avatar" className="max-w-12 max-h-12 rounded-full" />

            <div className="border border-gray-400 grow ml-4 rounded overflow-hidden">
              <div className="py-3 px-4 bg-gray-200">
                <a href={issue?.user?.html_url} className="font-semibold text-gray-600 hover:text-blue-700">
                  {issue?.user?.login}{" "}
                </a>
                commented{" "}
                {formatDistanceStrict(new Date(issue?.created_at), new Date(), {
                  addSuffix: true,
                })}
              </div>
              <div className="p-4 markdown-body">
                {/* <ReactMarkdown children={issue?.body} /> */}
                <ReactMarkdown>{issue?.body}</ReactMarkdown>
              </div>
            </div>
          </div>
          <hr className="border-t-gray-300 my-8" />
          <IssueComments issueNumber={issueNumber} />
        </div>
      )}
    </>
  );
};

export default IssueDetail;
