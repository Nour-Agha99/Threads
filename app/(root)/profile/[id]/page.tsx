import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadTab from "@/components/shared/ThreadTab";
// import { ThreadTab } from "@/components/shared/ThreadTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(params.id);

  if (!userInfo || !userInfo.onboard) {
    redirect("/onboarding");
  }
  return (
  <section>
    <ProfileHeader 
      accountId={userInfo.id}
      name={userInfo.name}
      username={userInfo.username}
      imaUrl={userInfo.image}
      bio={userInfo.bio}
      authUserId={user.id}
    />
    <div className="mt-9">
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="tab">
          {profileTabs.map((tab:any)=>(
            <TabsTrigger key={tab.label} value={tab.value} className="tab" >
              <Image src={tab.icon} alt={`${tab.label}-icon`} width={24} height={24} className='object-contain'/>
              <p className="max-sm:hidden">{tab.label}</p>
              {tab.label === 'Threads' && (
                <p className='ml-1 rounded bg-light-4 px-2 py-1 text-tiny-medium text-light-1'>{userInfo.threads?.length}</p>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {profileTabs.map((tab)=>(
          <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
            <ThreadTab 
             currentUserId={user.id}
             accountId={userInfo.id}
             accountType='User'
            />
          </TabsContent>
        ))

        }
      </Tabs>
    </div>
  </section>
  );
};

export default page;
