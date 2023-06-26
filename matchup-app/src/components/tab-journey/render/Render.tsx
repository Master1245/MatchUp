// components/tab_journey/render/Render.tsx

import { WordLanguage } from "../../language/Language";
import { RenderComment } from "./RenderComment";
import { RenderProfile } from "./RenderProfile";

export interface GenericObject<T extends 'comment' | 'profile'> {
  type: T;
  id: number;
  specificProperty: T extends 'comment' ? CommentSpecificProperty : ProfileSpecificProperty;
}

export interface CommentSpecificProperty {
  name: string;
  comment: string;
}

export interface ProfileSpecificProperty {
  username: string | undefined;
  bio: string | undefined;
  avatar: string | undefined;
  local: string | undefined;
  social_media: string | undefined;
}

export type RenderProps = {
  data: GenericObject<'comment' | 'profile'>; // colocar ser o tipo profile ou comment iniert aqui
  key: number;
  id: string;
}


export function Render({ data, id, key }: RenderProps) {
  if (!data) {
    return null;
  }

  if (data.type === 'profile') {
    const profileData = data.specificProperty as ProfileSpecificProperty; // Type assertion

    return (
      <div
        id={id}
        key={key}
      >
        <RenderProfile
          id={data.id}
          username={profileData.username}
          bio={profileData.bio}
          avatar={profileData.avatar}
          local={profileData.local}
          social_media={profileData.social_media}
        />
      </div>
    );
  }

  if (data.type === 'comment') {
    const commentData = data.specificProperty as CommentSpecificProperty; // Type assertion

    return (
      <div
        id={id}
        key={key}
      >
        <RenderComment
          id={data.id}
          name={commentData.name}
          comment={commentData.comment}
        />
      </div>
    );
  }

  return (
    <div
      id={id}
      key={key}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <h1>
        <WordLanguage text="Search of more results" />
      </h1>
    </div>
  );
}