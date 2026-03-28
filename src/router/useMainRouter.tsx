import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import FitContainer from "@components/Layout/Container/FitContainer";
import FullContainer from "@components/Layout/Container/FullContainer";
import MainLayout from "@components/Layout/MainLayout";
import NeedAuth from "@components/NeedAuth/NeedAuth";
import NeedLogin from "@components/NeedAuth/NeedLogin";

const useMainRouter = () =>
  useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          element: <FullContainer />,
          children: [
            {
              index: true,
              element: (
                /* TODO: fallback 컴포넌트 구현 */
                <Suspense fallback={<div>로딩 중...</div>}>
                  <Home />
                </Suspense>
              ),
            },
            {
              path: "*",
              element: (
                <Suspense fallback={<div>로딩 중...</div>}>
                  <NotFound from="Page" />
                </Suspense>
              ),
            },
            {
              path: "signUp",
              element: (
                <Suspense fallback={<div>로딩 중...</div>}>
                  <SignUp />
                </Suspense>
              ),
            },
            {
              path: "login",
              element: (
                <Suspense fallback={<div>로딩 중...</div>}>
                  <Login />
                </Suspense>
              ),
            },
            {
              path: "searchAccount",
              element: (
                <Suspense fallback={<div>로딩 중...</div>}>
                  <SearchAccount />
                </Suspense>
              ),
            },
            {
              path: "profile/:memberId/*",
              element: (
                <NeedLogin>
                  <Suspense fallback={<div>로딩 중...</div>}>
                    <Profile />
                  </Suspense>
                </NeedLogin>
              ),
            },
          ],
        },
        {
          element: <FitContainer />,
          children: [
            {
              path: "admin",
              children: [
                {
                  path: "dutyManage",
                  element: (
                    <NeedAuth>
                      <Suspense fallback={<div>로딩 중...</div>}>
                        <DutyManage />
                      </Suspense>
                    </NeedAuth>
                  ),
                },
                /* {
                  path: 'electionManage',
                  element: <div />,
                }, */
                {
                  path: "libraryManage/*",
                  element: (
                    <NeedAuth roles={["ROLE_사서"]}>
                      <Suspense fallback={<div>로딩 중...</div>}>
                        <LibraryManage />
                      </Suspense>
                    </NeedAuth>
                  ),
                },
                {
                  path: "seminarManage",
                  element: (
                    <NeedAuth roles={["ROLE_서기"]}>
                      <Suspense fallback={<div>로딩 중...</div>}>
                        <SeminarManage />
                      </Suspense>
                    </NeedAuth>
                  ),
                },
                {
                  path: "activeMemberManage",
                  element: (
                    <NeedAuth roles={["ROLE_서기"]}>
                      <Suspense fallback={<div>로딩 중...</div>}>
                        <ActiveMemberManage />
                      </Suspense>
                    </NeedAuth>
                  ),
                },
                {
                  path: "meritManage",
                  element: (
                    <NeedAuth roles={["ROLE_서기"]}>
                      <Suspense fallback={<div>로딩 중...</div>}>
                        <MeritManage />
                      </Suspense>
                    </NeedAuth>
                  ),
                },
              ],
            },
            {
              path: "board",
              children: [
                {
                  path: ":categoryName",
                  element: (
                    <NeedLogin>
                      <Suspense fallback={<div>로딩 중...</div>}>
                        <BoardList />
                      </Suspense>
                    </NeedLogin>
                  ),
                },
                {
                  path: "write/:categoryName",
                  element: (
                    <NeedLogin>
                      <Suspense fallback={<div>로딩 중...</div>}>
                        <BoardWrite />
                      </Suspense>
                    </NeedLogin>
                  ),
                },
                {
                  path: "view/:postId",
                  element: (
                    <NeedLogin>
                      <Suspense fallback={<div>로딩 중...</div>}>
                        <BoardView />
                      </Suspense>
                    </NeedLogin>
                  ),
                },
              ],
            },
            {
              path: "study",
              element: (
                <NeedLogin>
                  <Suspense fallback={<div>로딩 중...</div>}>
                    <Study />
                  </Suspense>
                </NeedLogin>
              ),
            },
            {
              path: "library",
              element: (
                <NeedLogin>
                  <Suspense fallback={<div>로딩 중...</div>}>
                    <Library />
                  </Suspense>
                </NeedLogin>
              ),
            },
            {
              path: "seminar",
              element: (
                <NeedLogin>
                  <Suspense fallback={<div>로딩 중...</div>}>
                    <SeminarAttend />
                  </Suspense>
                </NeedLogin>
              ),
            },
            /* {
              path: 'election',
              element: <div />,
            }, */
            {
              path: "rank",
              element: (
                <NeedLogin>
                  <Suspense fallback={<div>로딩 중...</div>}>
                    <Rank />
                  </Suspense>
                </NeedLogin>
              ),
            },
            {
              path: "game",
              element: (
                <NeedLogin>
                  <Suspense fallback={<div>로딩 중...</div>}>
                    <Game />
                  </Suspense>
                </NeedLogin>
              ),
            },
            /* {
              path: 'ctf',
              children: [
                {
                  path: 'select',
                  element: <div />,
                },
                {
                  path: 'challenge',
                  element: <div />,
                },
                {
                  path: 'scoreboard',
                  element: <div />,
                },
                {
                  path: 'team',
                  element: <div />,
                },
                {
                  path: 'admin',
                  children: [
                    { path: 'challengeManage', element: <div /> },
                    { path: 'submissions', element: <div /> },
                    { path: 'operation', element: <div /> },
                  ],
                },
              ],
            }, */
          ],
        },
      ],
    },
  ]);

export default useMainRouter;

const Game = lazy(() => import("@pages/Game/Game"));
const Library = lazy(() => import("@pages/Library/Library"));
const NotFound = lazy(() => import("@pages/NotFound/NotFound"));
const Profile = lazy(() => import("@pages/Profile/Profile"));
const SignUp = lazy(() => import("@pages/SignUp/SignUp"));
const Study = lazy(() => import("@pages/Study/Study"));
const ActiveMemberManage = lazy(
  () => import("@pages/admin/ActiveMemberManage/ActiveMemberManage"),
);
const DutyManage = lazy(() => import("@pages/admin/DutyManage/DutyManage"));
const LibraryManage = lazy(
  () => import("@pages/admin/LibraryManage/LibraryManage"),
);
const MeritManage = lazy(() => import("@pages/admin/MeritManage/MeritManage"));
const SeminarManage = lazy(
  () => import("@pages/admin/SeminarManage/SeminarManage"),
);
const BoardList = lazy(() => import("@pages/board/BoardList/BoardList"));
const BoardView = lazy(() => import("@pages/board/BoardView/BoardView"));
const BoardWrite = lazy(() => import("@pages/board/BoardWrite/BoardWrite"));
const Home = lazy(() => import("@pages/home/Home"));
const Login = lazy(() => import("@pages/login/Login"));
const SearchAccount = lazy(() => import("@pages/login/SearchAccount"));
const Rank = lazy(() => import("@pages/rank/Rank"));
const SeminarAttend = lazy(() => import("@pages/senimarAttend/SenimarAttend"));
