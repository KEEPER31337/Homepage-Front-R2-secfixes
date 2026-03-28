import React, { useReducer, useState, lazy, Suspense } from "react";
import { Button, Typography } from "@mui/material";
import {
  VscArrowDown,
  VscArrowUp,
  VscFolder,
  VscFolderOpened,
} from "react-icons/vsc";
import { PostInfo } from "@api/dto";
import {
  useGetPostFilesQuery,
  useControlPostLikesMutation,
  useControlPostDislikesMutation,
  useDownloadFileMutation,
} from "@api/postApi";
import FilledButton from "@components/Button/FilledButton";
import OutlinedButton from "@components/Button/OutlinedButton";
import FileViewer from "@components/Viewer/FileViewer";
import WarningDeductPointModal from "../Modal/WarningDeductPointModal";

interface PostSectionProps {
  postId: number;
  post: PostInfo;
  password?: string;
}

const PostSection = ({ postId, post, password }: PostSectionProps) => {
  const [fileOpen, toggleFileOpen] = useReducer((prev) => !prev, false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const hasWarningModal =
    post.categoryName === "시험게시판" && post.isRead === false && !fileOpen;

  const { data: files } = useGetPostFilesQuery(postId, fileOpen, password);
  const { mutate: controlLikes } = useControlPostLikesMutation();
  const { mutate: controlDislikes } = useControlPostDislikesMutation();
  const { mutate: downloadFile } = useDownloadFileMutation();
  const handleFileOpenButtonClick = () => {
    if (hasWarningModal) {
      setWarningModalOpen(true);
      return;
    }

    toggleFileOpen();
  };

  const handleWarningModalActionClick = () => {
    setWarningModalOpen(false);
    toggleFileOpen();
  };

  const handleDownloadFileClick = (fileId: number, fileName: string) => {
    downloadFile({ postId, fileId, fileName });
  };

  const handleLikeButtonClick = () => {
    controlLikes(postId);
  };

  const handleDisikeButtonClick = () => {
    controlDislikes(postId);
  };

  return (
    <div className="min-h-[500px] bg-middleBlack px-6 pb-8 pt-3 sm:px-14 sm:py-10">
      <Suspense fallback={<div>로딩 중...</div>}>
        <StandardViewer className="mb-4 min-h-[380px]" content={post.content} />
      </Suspense>
      {post.fileCount > 0 && (
        <>
          <Button
            className="hover:!bg-transparent"
            variant="text"
            onClick={handleFileOpenButtonClick}
            startIcon={fileOpen ? <VscFolderOpened /> : <VscFolder />}
          >
            첨부파일 ({post.fileCount})
          </Button>
          {fileOpen && (
            <div className="mt-2 mb-10 space-y-2 text-pointBlue">
              <Typography variant="small" className="block text-subOrange">
                *파일 다운로드를 위해서는 댓글 작성이 필요합니다.
              </Typography>
              {files && (
                <FileViewer
                  files={files}
                  onRowClick={handleDownloadFileClick}
                />
              )}
            </div>
          )}
        </>
      )}
      <div className="flex items-center justify-center mt-8 space-x-2">
        {post.isLike ? (
          <FilledButton small onClick={handleLikeButtonClick}>
            <VscArrowUp className="mr-1" size={10} />
            <span>추천 ({post.likeCount})</span>
          </FilledButton>
        ) : (
          <OutlinedButton small onClick={handleLikeButtonClick}>
            <VscArrowUp className="mr-1" size={10} />
            <span>추천 ({post.likeCount})</span>
          </OutlinedButton>
        )}
        {post.isDislike ? (
          <FilledButton small onClick={handleDisikeButtonClick}>
            <VscArrowDown className="mr-1" size={10} />
            <span>비추천 ({post.dislikeCount})</span>
          </FilledButton>
        ) : (
          <OutlinedButton small onClick={handleDisikeButtonClick}>
            <VscArrowDown className="mr-1" size={10} />
            <span>비추천 ({post.dislikeCount})</span>
          </OutlinedButton>
        )}
      </div>
      {hasWarningModal && (
        <WarningDeductPointModal
          open={warningModalOpen}
          onClose={() => setWarningModalOpen(false)}
          onActionButonClick={handleWarningModalActionClick}
        />
      )}
    </div>
  );
};

export default PostSection;

export const StandardViewer = lazy(
  () => import("@components/Viewer/StandardViewer"),
);
