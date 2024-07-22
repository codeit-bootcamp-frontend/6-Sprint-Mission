"use client";

import { RecoilRoot } from "recoil";

const RecoilRootProviders = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot> {children} </RecoilRoot>;
};

export default RecoilRootProviders;
