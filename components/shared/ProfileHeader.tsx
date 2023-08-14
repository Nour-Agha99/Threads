import Image from "next/image";
import React from "react";
interface Params {
  accountId: string;
  name: string;
  username: string;
  imaUrl: string;
  bio: string;
  authUserId: string;
}
const ProfileHeader = ({
  accountId,
  name,
  username,
  imaUrl,
  bio,
  authUserId,
}: Params) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex flex-col items-start justify-between">
        <div className="flex flex-col items-center gap-3 max-sm:flex-row">
            <div className="relative h-20 w-20 object-cover">
                <Image src={imaUrl} alt="Profile image" fill className="rounded-full object-cover shadow-2xl bg-dark-4"/>
            </div>
            <div className="flex-1">
                <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
                <p className="text-base-medium text-gray-1">@{username}</p>
            </div>
        </div>
      {/* <Thread /> */}
        <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
        <div className="mt-12 h-0.5 w-full text-dark-3">{bio}</div>
      </div>
    </div>
  );
};

export default ProfileHeader;
