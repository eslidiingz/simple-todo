import { formatDistance, formatDistanceStrict } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import IconClosed from "./Icon/IconClosed";
import IconComment from "./Icon/IconComment";
import IconLoading from "./Icon/IconLoading";
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
        <div className="bg-gray-200 p-4">
          <a href="https://github.com/facebook/create-react-app" className="text-2xl mb-2 inline-block text-blue-700">
            facebook / create-react-app
          </a>

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
            <IconLoading /> Loading...
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
                  <Link href={`/issues/${issue?.number}`} className="font-semibold">
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
                <Link href={`/issues/${issue?.number}`}>
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
