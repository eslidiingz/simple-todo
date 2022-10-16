import { useRouter } from "next/router";
import React from "react";
import IssueDetail from "../../components/IssueDetail";

const IssuesDetail = () => {
  const { query } = useRouter();

  if (query?.id) {
    return <IssueDetail issueNumber={query?.id} />;
  }
};

export default IssuesDetail;
