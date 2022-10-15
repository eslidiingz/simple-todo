import { formatDistance, formatDistanceStrict } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import IconClosed from "./Icon/IconClosed";
import IconComment from "./Icon/IconComment";
import IconOpen from "./Icon/IconOpen";

const Issues = () => {
  const [filter, setFilter] = useState("open");

  const { isLoading, isSuccess, data: issues } = useQuery(["issues", filter], fetchIssues, filter);
  const { isSuccess: isSuccessIssuesOpen, data: issuesOpen } = useQuery(["issuesOpen"], fetchIssuesOpen);
  const { isSuccess: isSuccessIssuesClosed, data: issuesClosed } = useQuery(["issuesClosed"], fetchIssuesClosed);

  function fetchIssues() {
    return fetch(`https://api.github.com/repos/facebook/create-react-app/issues?state=${filter}`).then((response) =>
      response.json()
    );
  }

  function fetchIssuesOpen() {
    return fetch(
      `https://api.github.com/search/issues?q=repo:facebook/create-react-app+type:issue+state:open&per_page=1`
    ).then((response) => response.json());
  }

  function fetchIssuesClosed() {
    return fetch(
      `https://api.github.com/search/issues?q=repo:facebook/create-react-app+type:issue+state:closed&per_page=1`
    ).then((response) => response.json());
  }

  return (
    <div className="container max-w-screen-lg mx-auto mt-8">
      <div className="border border-gray-400 rounded-lg overflow-hidden">
        <div className="px-4 bg-gray-200 p-4">
          <Link href={``}>
            <a className="text-2xl mb-2 inline-block text-blue-700">facebook / create-react-app</a>
          </Link>
          <div className="flex space-x-4">
            <button className="flex" onClick={() => setFilter("open")}>
              <IconOpen />{" "}
              <div className={filter === "open" ? "font-semibold" : ""}>
                {isSuccessIssuesOpen && <span>{issuesOpen?.total_count} </span>} open
              </div>
            </button>
            <button className="flex" onClick={() => setFilter("closed")}>
              <IconClosed />{" "}
              <div className={filter === "closed" ? "font-semibold" : ""}>
                {isSuccessIssuesClosed && <span>{issuesClosed?.total_count} </span>} closed
              </div>
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline-block animate-spin mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Loading...
          </div>
        )}

        {isSuccess &&
          issues.map((issue) => (
            <div
              key={issue?.number}
              className="flex justify-between px-4 py-3 border border-t-gray-400 items-center bg-white hover:bg-gray-100"
            >
              <div className="flex">
                <div className="mr-2">
                  {issue?.state === "open" && <IconOpen />}
                  {issue?.state === "closed" && <IconClosed />}
                </div>
                <div>
                  <Link href={`/issues/1`} className="font-semibold">
                    <a className="font-semibold hover:text-blue-700">{issue?.title}</a>
                  </Link>
                  <div className="text-gray-500">
                    #{issue?.number} opened{" "}
                    {formatDistanceStrict(new Date(issue?.created_at), new Date(), {
                      addSuffix: true,
                    })}{" "}
                    by {issue?.user?.login}
                  </div>
                </div>
              </div>

              {issue?.comments > 0 && (
                <Link href={`/issues/1`}>
                  <a className="flex items-center">
                    <IconComment /> <div className="ml-1">{issue?.comments}</div>
                  </a>
                </Link>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Issues;
