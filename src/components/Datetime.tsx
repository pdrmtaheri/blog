import { type ReactElement } from "react";

import type { CollectionEntry } from "astro:content";

interface IDatetimesProps {
  pubDatetime: Date | string;
  modDatetime?: Date | string | null;
  size?: "lg" | "sm";
  className?: string;
  readingTime?: string;
}

interface IEditPostProps {
  editPost?: CollectionEntry<"blog">["data"]["editPost"];
  postId?: CollectionEntry<"blog">["id"];
  size?: "lg" | "sm";
  className?: string;
}

const DateIcon = ({ size }: { size: "lg" | "sm" }): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${
      size === "sm" ? "scale-90" : "scale-100"
    } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
    aria-hidden="true"
  >
    <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z" />
    <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z" />
  </svg>
);

const TimeIcon = ({ size }: { size: "lg" | "sm" }): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${
      size === "sm" ? "scale-90" : "scale-100"
    } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
    aria-hidden="true"
  >
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
    <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
  </svg>
);

const EditIcon = ({ size }: { size: "lg" | "sm" }): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${
      size === "sm" ? "scale-90" : "scale-100"
    } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
    aria-hidden="true"
  >
    <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z" />
    <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z" />
  </svg>
);

const ReadingTime = ({
  readingTime,
  size,
}: {
  readingTime: string;
  size: "lg" | "sm";
}): ReactElement => (
  <span className="text-xs">
    <TimeIcon size={size} />
    {readingTime}
  </span>
);

const FormattedDate = ({ datetime }: { datetime: Date }): ReactElement => (
  <>
    {datetime.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}
  </>
);

const getDisplayDate = (pubDatetime: Date | string, modDatetime?: Date | string | null): Date => {
  const pubDate = new Date(pubDatetime);
  if (modDatetime === null || modDatetime === undefined) {
    return pubDate;
  }
  const modDate = new Date(modDatetime);
  return modDate > pubDate ? modDate : pubDate;
};

const Datetimes = ({
  pubDatetime,
  modDatetime,
  size,
  className,
  readingTime,
}: IDatetimesProps): ReactElement => {
  const displayDate = getDisplayDate(pubDatetime, modDatetime);
  const effectiveSize = size ?? "sm";

  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className ?? ""}`}>
      <DateIcon size={effectiveSize} />
      <FormattedDate datetime={displayDate} />
      {readingTime !== undefined && readingTime !== "" && (
        <ReadingTime readingTime={readingTime} size={effectiveSize} />
      )}
    </div>
  );
};

const EditPost = ({ editPost, postId, size, className }: IEditPostProps): ReactElement | null => {
  const editPostUrl = editPost?.url ?? "";
  if (editPost === undefined || editPost.disabled === true || editPostUrl === "") {
    return null;
  }

  const editHref =
    editPostUrl +
    (editPost.appendFilePath === true && postId !== undefined
      ? postId.replace(/\d{4}-\d{2}-\d{2}-/, "")
      : "");

  return (
    <div className={`opacity-80 ${className ?? ""}`}>
      <a
        className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-skin-accent"
        href={editHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {editPost.text ?? "Edit post"}
        <EditIcon size={size ?? "sm"} />
      </a>
    </div>
  );
};

export default function Datetime({
  pubDatetime,
  modDatetime,
  editPost,
  postId,
  size = "sm",
  className,
  readingTime,
}: IDatetimesProps & IEditPostProps): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <Datetimes
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
        size={size}
        className={className}
        readingTime={readingTime}
      />
      <EditPost editPost={editPost} postId={postId} size={size} className={className} />
    </div>
  );
}
