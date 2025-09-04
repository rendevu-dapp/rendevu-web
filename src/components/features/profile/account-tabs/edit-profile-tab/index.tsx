// react
import { FC } from "react";
// types
import { User } from "@/common/types/models/user";
import EditProfileTabLoading from "./loading-skeleton";
// components
import EditProfileTabArea from "./tab-area";

type EditProfileTabProps = {
  loading?: boolean;
  user?: User;
};

const EditProfileTab: FC<EditProfileTabProps> = ({ loading, user }) => {
  if (loading) {
    return <EditProfileTabLoading />;
  }

  return <EditProfileTabArea user={user} />;
};

export default EditProfileTab;
