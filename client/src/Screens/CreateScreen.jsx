import CreateForm from "../Components/CreateForm";
import { useEffect } from "react";

const CreateScreen = () => {
  useEffect(() => {
    document.title = "Create Post";
  });
  return (
    <div>
      <CreateForm />
    </div>
  );
};

export default CreateScreen;
